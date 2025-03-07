import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const page = async () => {
    try {
        const supabase = await createClient();
        let { data: services } = await supabase.from('services').select('id, title, price');
        if (services) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
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
            )
        }
    } catch (error) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Error al cargar los servicios. Intente recargando la pagina.</h1>
            </div>
        )
    }
}

export default page;