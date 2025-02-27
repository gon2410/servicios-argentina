"use client";
import * as z from "zod";
import { LoginSchema } from "@/schemas"
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
import { signIn } from "next-auth/react";

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async(values: z.infer<typeof LoginSchema>) => {
        try {
            const response = await signIn("credentials",{
                email: values.email,
                password: values.password,
                redirect: false
            })
            console.log(response)

            if (response?.error) {
                return setError(response.error as string);
            }

            if (response?.ok) {
                router.push("/");
                router.refresh();
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
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
                    Iniciar Sesión
                </Button>
            </form>
        </Form>
    )
}

export default Login;