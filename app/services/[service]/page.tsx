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
        const supabase = await createClient();
        if (!supabase) throw new Error('No pudimos conectarnos a la base de datos. Intente recargando la pagina.');

        const id = (await params).service;

        const { data: service, error } = await supabase.from('services').select('*').eq('id', id).single();
        if (error) throw new Error("Algo salió mal buscando el servicio.");
        if (!service) throw Error("No se encontró el servicio.");

        const { data: profile, error: profileError } = await supabase.from('profiles').select('name').eq('owner', service.owner).single();
        if (profileError) throw new Error("Algo salió mal buscando al proveedor del servicio.");
        if(!profile) throw new Error("No se encontró al proveedor del servicio.");

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

    } catch (error: unknown) {
        return (
            <div className="text-center">
                <h1>{error instanceof Error ? error.message : "Algo salió mal"}</h1>
            </div>
        )
    }

}

export default page