import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
const page = async () => {
    try {
        const supabase = await createClient();
        if (!supabase) throw new Error('No pudimos conectarnos a la base de datos. Intente recargando la pagina.');

        const { data: profiles, error } = await supabase.from('profiles').select('id, name, ocupation, location');
        if (error) throw new Error("Algo salió mal buscando proveedores");
        if (!profiles) throw new Error("Algo salió mal buscando proveedores");

        if (profiles?.length == 0) throw new Error("No se encontraron proveedores");

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                    <div key={profile.id} className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full">
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
                                    href={`/providers/${profile.id}`}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                                    Ver mas
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )

    } catch (error: unknown) {
        return (
            <div className="text-center">
                <h1>{error instanceof Error ? error.message : "Algo salió mal"}</h1>
            </div>
        )
    }
}

export default page