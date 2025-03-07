"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState, useTransition } from "react";
import { updateServiceAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

interface Service {
    title: string;
    description: string;
    price: number;
    id: string;
}

const EditService = ({ title, description, price, id }:Service) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        startTransition(async() => {
            const result = await updateServiceAction(formData);

            if (result.success) {
                setError("");
                setSuccess(result.message);
                router.refresh();
            } else {
                setSuccess("");
                setError(result.message);
            }

            setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
        });
    };
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                    Editar
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    {/* create separate client component to handle submit */}
                    <SheetTitle>Editar {title}</SheetTitle>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input defaultValue={id} name="id" type="hidden"/>
                        <Input defaultValue={title} name="title"/>
                        <Textarea defaultValue={description} name="description" rows={15}/>
                        <Input type="number" defaultValue={price} name="price"/>

                        {isPending ?
                            <Button variant={"outline"} disabled>
                                Actualizando...
                            </Button>
                        :
                            <Button variant={"outline"} type="submit">
                                Actualizar
                            </Button>
                        }

                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                    </form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default EditService;