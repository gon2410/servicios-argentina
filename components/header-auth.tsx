import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

export default async function AuthButton() {
  	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	const {data: profile} = await supabase.from("profiles").select("image_url").eq("owner", user?.email).single();
  	return user ? (
   		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image
                    src={`https://hbsnhpdrofauvbutkjhp.supabase.co/storage/v1/object/public/servicios-argentina/${profile?.image_url}` || "/placeholder.svg"}
					alt="profile_image"
					width={30}
					height={30}
					className="rounded-full m-2"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem><Link href="/profile">Mi Perfil</Link></DropdownMenuItem>
				<DropdownMenuItem><Link href="/myservices">Mis servicios</Link></DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem><Link href="/services">Servicios</Link></DropdownMenuItem>
				<DropdownMenuItem><Link href="/providers">Proveedores</Link></DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<form action={signOutAction}>
						<Button type="submit" variant={"destructive"}>
							Cerrar Sesion
						</Button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
   		</DropdownMenu>
  ) : (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<RxAvatar className="h-5 w-5" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Button asChild size="sm" variant={"outline"}>
						<Link href="/sign-in">Iniciar sesión</Link>
					</Button>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Button asChild size="sm" variant={"default"}>
						<Link href="/sign-up">Crear cuenta</Link>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
  );
}
