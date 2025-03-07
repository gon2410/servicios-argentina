import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import EditService from "@/components/edit-service";
import CreateService from "@/components/create-service";

const page = async () => {
    try {
        const supabase = await createClient();
        const { data: user } = await supabase.auth.getUser();
        if (user.user) {
            const { data: services } = await supabase.from('services').select('*').eq('owner', user.user.id);
            if (services) {
                return (
                    <>  
                        <h1 className="text-2xl font-bold">Mis servicios</h1>
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
                        
                        <CreateService owner={user.user.email as string}/>
                    </> 
                )
            }
        }
    } catch (error) {
        return (
            <div className="text-center">
                <h1>Algo salió mal</h1>
            </div>
        )
    }
}

export default page;