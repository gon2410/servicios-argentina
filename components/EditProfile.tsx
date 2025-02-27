"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateProfileSchema } from "@/schemas";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface Props {
    userId: string;
    name: string;
    ocupation: string;
    location: string;
    bio: string;
}

const EditProfile = ({userId, name, ocupation, location, bio}: Props) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            name: name,
            ocupation: ocupation,
            location: location,
            bio: bio
        }
    });

    const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
        try {
			const response = await axios.patch("https://servicios-argentina-peot.vercel.app/api/users", {
                userId: userId,
				newName: values.name,
				newOcupation: values.ocupation,
				newLocation: values.location,
                newBio: values.bio
			})

			if (response.status == 200) {
				form.reset();
				setError("");
				setSuccess("Perfil actualizado.")
				router.refresh();

				setTimeout(() => {
					setError("");
					setSuccess("");
				}, 7000);

				
            } else {
				setSuccess("")
				setError("Algo salió mal.")
			}
		} catch (error) {
			if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
		}
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Editar</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar perfil</DialogTitle>
                        <DialogDescription>
                            Se actualizaran los datos de su perfil
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
                            <div className="space-y-4">
                                <FormField 
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre completo</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Juan Perez"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
    
                                />
                                <FormField 
                                    control={form.control}
                                    name="ocupation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ocupación</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Soldador"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                
                                />
                                <FormField 
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Precio
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Buenos Aires"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Biografia
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="" rows={15}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error}/>
                            <FormSuccess message={success}/>
                            <Button type="submit" className="w-full">Crear</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            {/* <Button variant="outline" onClick={handleDelete}>Delete</Button> */}
        </div>
    )
}

export default EditProfile;