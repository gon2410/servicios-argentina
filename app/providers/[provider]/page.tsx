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

const page = async ({ params }: {params: Promise<{ provider: number }>}) => {
    try {
        const supabase = await createClient();
        if (!supabase) throw new Error('No pudimos conectarnos a la base de datos. Intente recargando la pagina.');
    
        const id = (await params).provider;

        const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', id).single();
        if (error) throw new Error("Algo salió mal buscando el perfil.");
        if (!profile) throw new Error("No se encontró el perfil.");

        const { data: user } = await supabase.auth.getUser();

        return (
            <Card>
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle>
                        <Image
                            src={"/placeholder.svg"}
                            alt={profile.name}
                            height={50}
                            width={50}
                            className="rounded-full"
                        />
                    </CardTitle>
                    <CardTitle>
                        <h1>{user.user?.email == profile.owner ? "Usted" : profile.name}</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{profile.ocupation}</CardDescription>
                    <CardDescription>{profile.location}</CardDescription>
                    <CardDescription>{profile.bio}</CardDescription>
                </CardContent>
            </Card>
        )

    } catch (error: unknown) {
        return (
            <div className="text-center">
                <h1>{error instanceof Error ? error.message : 'Algo salio mal'}</h1>
            </div>
        )
    }
}

export default page