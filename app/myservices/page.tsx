import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import EditService from "@/components/edit-service";
import CreateService from "@/components/create-service";

const page = async () => {
    try {
        const supabase = await createClient();
        if (!supabase) throw new Error("No pudimos conectarnos a la base de datos");

        const { data: user } = await supabase.auth.getUser();
        if (!user.user) throw new Error("No estas logueado. No tenes acceso.");

        const { data: services, error } = await supabase.from('services').select('*').eq('owner', user.user.email);
        if (error) throw new Error("Algo salió mal buscando los servicios.");
        if (!services) throw new Error("No se encontraron servicios.");

        return (
            <>  
                <h1 className="text-2xl font-bold">Mis servicios</h1>
                    {services.length != 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full">
                                    <Image
                                        src={"/placeholder.svg"}
                                        alt={service.title}
                                        width={400}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                        priority={true}
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold">{service.title}</h3>
                                        <div className="mt-4 flex justify-between items-center">
                                            <span className="text-indigo-600 font-bold">~${service.price}</span>
                                            <EditService title={service.title} description={service.description} price={service.price} id={service.id}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    :
                        <div className="text-center">
                            <h1>No tenés servicios por el momento. Podes crear uno en el formulario mas abajo</h1>
                        </div>
                    }

                <CreateService owner={user.user.email as string}/>
            </> 
        )
    } catch (error: unknown) {
        return (
            <div className="text-center">
                <h1>{error instanceof Error ? error.message : 'Algo salió mal'}</h1>
            </div>
        )
    }
}

export default page;