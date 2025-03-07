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

export default async function AuthButton() {
  	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

  	return user ? (
   		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image
					src={"/placeholder.svg"}
					alt="profile_image"
					width={30}
					height={30}
					className="rounded-full m-2"
				/>	
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem><Link href="/profile">Mi Perfil</Link></DropdownMenuItem>
				<DropdownMenuItem><Link href="/createservice">Mis servicios</Link></DropdownMenuItem>
				<DropdownMenuSeparator></DropdownMenuSeparator>
				<DropdownMenuItem><Link href="/services">Servicios</Link></DropdownMenuItem>
				<DropdownMenuItem><Link href="/providers">Proveedores</Link></DropdownMenuItem>
				<DropdownMenuSeparator></DropdownMenuSeparator>
				<DropdownMenuLabel>
					<form action={signOutAction}>
						<Button type="submit" variant={"destructive"}>
							Salir
						</Button>
					</form>
				</DropdownMenuLabel>
			</DropdownMenuContent>
   		</DropdownMenu>
  ) : (
    <div className="flex gap-2">
		<Button asChild size="sm" variant={"outline"}>
			<Link href="/sign-in">Iniciar sesión</Link>
		</Button>
		<Button asChild size="sm" variant={"default"}>
			<Link href="/sign-up">Crear cuenta</Link>
		</Button>
    </div>
  );
}
