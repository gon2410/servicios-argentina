"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema } from "@/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useRouter } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
  } from "@/components/ui/card";





interface Props {
	userId: string | undefined;
}

const CreateService = ({ userId }: Props) => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const form = useForm<z.infer<typeof ServiceSchema>>({
		resolver: zodResolver(ServiceSchema),
		defaultValues: {
			title: "",
			desc: "",
			price: ""
		}
	})

	const onSubmit = async (values: z.infer<typeof ServiceSchema>) => {
		try {
			const response = await axios.post(`https://servicios-argentina-peot.vercel.app/api/services?userId=${userId}`, {
				title: values.title,
				desc: values.desc,
				price: values.price
			})

			if (response.status == 200) {
				form.reset();
				setError("");
				setSuccess("Servicio creado exitosamente.")
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
	}

	return (
		<Card className="mt-10">
			<CardHeader>
				<CardTitle>Crear servicio</CardTitle>
				<CardDescription>Aqui puede crear un servicio nuevo.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
						<div className="space-y-4">
							<FormField 
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Titulo o Nombre</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Reparacion de cañerias"/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}

							/>
							<FormField 
								control={form.control}
								name="desc"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descripcion</FormLabel>
										<FormControl>
											<Textarea {...field} placeholder="Servicio de reparacion de cañerias. Nos encargamos..."/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							
							/>
							<FormField 
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Precio
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="5500" type="number"/>
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


			</CardContent>
		</Card>
	)
}

export default CreateService;