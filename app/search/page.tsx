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

const page = () => {
    const [profilesList, setProfilesList] = useState<Profile[]>([]);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query') as string;

        try {
            const supabase = createClient();
            const { data: profiles } = await supabase.from('profiles').select('*').ilike('name', `%${query}%`);

            if (profiles) {
                setProfilesList(profiles);
            } else {
                setError("No se encontraron perfiles");
            }
        } catch (error) {
            setError("Error al buscar los perfiles");
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
                <div className="text-center">
                    <h1>{error}</h1>
                </div>  
            :
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
                
            }
            
        </>



    )
}

export default page;