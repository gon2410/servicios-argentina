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
import { useRouter } from "next/navigation";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState, useTransition } from "react";
import { updateProfileAction } from "@/app/actions";

interface Profile {
    id: string;
    name: string;
    ocupation: string;
    location: string;
    bio: string;
}

const EditProfile = ({id, name, ocupation, location, bio}:Profile) => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async() => {
            const result = await updateProfileAction(formData);

            if (result.success) {
                setError("");
                setSuccess(result.message);
                router.refresh();
            }
            else {
                setSuccess("");
                setError(result.message);
            }

            setTimeout(() => {
                setSuccess("");
                setError("");
            }, 5000);
        })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"}>Editar</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Editar Perfil</SheetTitle>
                </SheetHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input defaultValue={id} name="id" type="hidden"/>
                        <Input defaultValue={name} name="name"/>
                        <Input defaultValue={ocupation} name="ocupation"/>
                        <Input defaultValue={location} name="location"/>
                        <Textarea defaultValue={bio} name="bio" rows={15}/>

                        {isPending ?
                            <Button variant={"outline"} type="submit" disabled>
                                Actualizando...
                            </Button>
                        :
                            <Button variant={"outline"} type="submit">
                                Actualizar
                            </Button>
                        }


                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </form>
                    
            </SheetContent>
        </Sheet>
    )
}

export default EditProfile;