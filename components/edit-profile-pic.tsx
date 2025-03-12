"use client";
import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { updateProfilePicAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
  
interface Props {
    email: string;
}

const EditProfilePic = ({email}: Props) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("email", email);

        startTransition(async () => {
            const result = await updateProfilePicAction(formData);

            if (result?.success) {
                router.refresh();
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"sm"}>
                    Cambiar imagen
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cambiar imagen de perfil</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <Input type="file" name="upload_file" accept="image/*" required/>
                    <div className="text-center mt-5">
                        {isPending ?
                            <Button disabled>Actualizando...</Button>
                        :
                            <Button type="submit">Cambiar imagen</Button>
                        }
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
};

export default EditProfilePic;