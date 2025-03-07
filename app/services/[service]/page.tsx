import { createClient } from "@/utils/supabase/server";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: {params: Promise<{ service: number }>}) => {
    try {
        const id = (await params).service;
        const supabase = await createClient();
        const { data: service } = await supabase.from('services').select('*').eq('id', id).single();
        const { data: profile} = await supabase.from('profiles').select('name').eq('owner', service.owner).single();

        if (service && profile) {
            return (
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <CardTitle>{service.title}</CardTitle>
                        <CardTitle>
                            <Link className="me-2" href={`/providers/${service.owner}`}>{profile.name}</Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{service.description}</CardDescription>
                        <CardDescription>${service.price}</CardDescription>
                    </CardContent>
                </Card>
            )
        } else {
            throw new Error('Servicio no encontrado');
        }

    } catch (error) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Error al cargar el servicio. Intente recargando la pagina.</h1>
            </div>
        )
    }

}

export default page