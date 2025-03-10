"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Profile {
    id: string;
    name: string;
    ocupation: string;
    location: string;
    bio: string;
    owner: string;
}

interface Service {
    id: string
    title: string;
    price: string;
    description: string
    owner: string;
}

const page = () => {
    const [profilesList, setProfilesList] = useState<Profile[]>([]);
    const [servicesList, setServicesList] = useState<Service[]>([]);
    const [error, setError] = useState("");


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query') as string;

        try {
            const supabase = createClient();
            if (!supabase) throw new Error('No pudimos conectarnos a la base de datos. Intente recargando la pagina.');

            const { data: profiles, error } = await supabase.from('profiles').select('*').ilike('name', `%${query}%`);
            if (error) throw new Error("Algo salió mal buscando en la base de datos.");

            const { data: services, error: ServicesError } = await supabase.from('services').select('*').ilike('title', `%${query}%`);
            if (ServicesError) throw new Error("Algo salió mal buscando en la base de datos.");

            if (profiles.length == 0 && services.length == 0) {
                throw new Error("No se encontraron resultados.")
            } else {
                setError("")
                setProfilesList(profiles);
                setServicesList(services);
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Algo salió mal");
            }
        }
    }

    return (
        <>
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
					<svg className="h-2.5 w-2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor">
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</Button>
			</form>

            {error ?
                <div className="text-center mt-5">
                    <h1>{error}</h1>
                </div>
            :
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                        {profilesList.map((profile) => (
                            <div key={profile.owner} className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full">
                                <div className="flex flex-1 justify-between p-3">
                                    <Image
                                        src={"/placeholder.svg"}
                                        alt={profile.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-gray-600 mt-2 flex-grow">{profile.ocupation}</p>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="font-bold">{profile.location}</span>
                                        <Link
                                            href={`/providers/${profile.owner}`}
                                            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                                            Ver mas
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesList.map((service) => (
                        <div key={service.id} className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full">
                            <Image
                                src={"/placeholder.svg"}
                                alt={service.title}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold">{service.title}</h3>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-indigo-600 font-bold">~${service.price}</span>
                                    <Link
                                        href={`/services/${service.id}`}
                                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                                        Ver mas
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            }
        </>
    )
}

export default page;