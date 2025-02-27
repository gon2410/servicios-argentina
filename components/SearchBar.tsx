"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface User {
	_id: string;
	name: string;
	image: string
	ocupation: string;
	location: string;
}

export default function SearchBar() {
	const [providersArray, setProvidersArray] = useState<User[]>([]);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		
		try {
			const usersResponse = await axios.get(`http://localhost:3000/api/users?action=userbyname&userId=&query=${formData.get("query")}`);
			const providers: User[] = await usersResponse.data;
			setProvidersArray(providers);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
			};
		};
	};

	return (
		<div className="max-w-2xl mx-auto relative z-10">
			<form className="relative" onSubmit={handleSubmit}>
				<Input
					type="search"
					name="query"
					className="w-full p-4 rounded-full shadow-md"
					placeholder="Buscar servicios o proveedores..."
					required
				/>
				<Button
					type="submit"
					variant="link"
					className="absolute right-3 top-0 text-black rounded">
					<svg className="h-2 w-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</Button>
			</form>
			<div className="flex mt-10">
				{providersArray.map(provider =>
					<Card key={provider._id} className="w-80 h-64 flex flex-col justify-between">
						<CardHeader className="flex-1">
							<CardTitle className="flex items-center space-x-2">
								<Image src={provider.image || "/placeholder.svg"} alt={provider.name} width={40} height={40} className="w-10 h-10 object-cover rounded-full" />
								<h3 className="text-lg font-semibold">{provider.name}</h3>
							</CardTitle>
							<CardDescription>{provider.location}</CardDescription>
						</CardHeader>
						<CardFooter className="flex justify-between">
							<p className="text-gray-600 mt-2">{provider.ocupation}</p>
							<Link href={`/providers/${provider._id}`} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
								Ver Perfil
							</Link>
						</CardFooter>
					</Card>
				)}
			</div>
		</div>
  )
}

