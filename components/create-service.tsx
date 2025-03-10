"use client";
import { createServiceAction } from "@/app/actions";
import { FormEvent, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useRouter } from "next/navigation";

interface Props {
    owner: string;
}

const CreateService = ({owner}: Props) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("owner", owner)
        startTransition(async () => {
            const result = await createServiceAction(formData);
            
            if (result.success) {
                setError("");
                setSuccess(result.message);
                router.refresh();
            } else {
                setSuccess("");
                setError(result.message);
            }

            setTimeout(() => {
                setError("");
                setSuccess("");
            }, 5000)
        })
    };
    return (
        <>
            <h1 className="text-2xl font-bold mt-10">Crear servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <Input name="title" placeholder="Reparacion de cañeria" required />
                <Input name="price" placeholder="0" type="number" required />
                <Textarea name="description" placeholder="Reparamos cañerias..." rows={10} required/>

                {isPending ?
                    <Button disabled variant={"outline"}>Creando...</Button>
                :
                    <Button type="submit" variant={"outline"}>Crear</Button>
                }
                <FormError message={error} />
                <FormSuccess message={success}/>
            </form> 
        </>
    )
}

export default CreateService;