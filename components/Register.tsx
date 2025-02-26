"use client";
import * as z from "zod";
import { RegisterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });

    const onSubmit = async(values: z.infer<typeof RegisterSchema>) => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/api/users", {
                name: values.name,
                email: values.email,
                password: values.password
            });

            if (response?.status != 200) {
                setSuccess("");
                setError(response.data.message);
            };

            if (response?.status == 200) {
                setError("");
                setSuccess("Cuenta creada exitosamente. Redirigiendo para iniciar sesion...");
                setTimeout(() => {
                    router.push("/auth/login");
                    router.refresh();
				}, 4000);
            };

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            };
        };
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre Completo</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Juan Perez"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="juanperez@ejemplo.com" type="email"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="*******" type="password"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error}/>
                <FormSuccess message={success} />
                <Button type="submit" className="w-full">
                    Registrarse
                </Button>
            </form>
        </Form>
    )
}

export default Register