import "./globals.css"
import { auth, signIn, signOut } from "@/auth";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { FcGoogle, FcPlus } from "react-icons/fc";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  



export const metadata: Metadata = {
	title: "Proveedor de servicios",
  	description: "Aplicación para proveedores de servicios tanto publicos como privados en Argentina",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
	const session = await auth();
	return (
		<html lang="en">
		<body className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-12">
						<div className="flex">
							{/* <Image
								src="/logo.png"
								alt="profile_image"
								width={30}
								height={30}
								className="rounded me-2"
							/> */}
							<Link href="/" className="flex-shrink-0 flex items-center font-bold">Servicios Arg</Link>
						</div>
						
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<NavLink href="/jobs">Servicios</NavLink>
							<NavLink href="/providers">Proveedores</NavLink>
							<NavLink href="/search">Buscar</NavLink>
							
							{/* <NavLink href="/reviews">Reviews</NavLink> */}
							{session ? <NavLink href="/createservice"> <FcPlus className="h-4 w-4 me-1"/> Mis Servicios</NavLink>: <p></p>}

							{/* {session ? 
								<SimpleButton redirectTo='/api/auth/signout'>
									<Button variant="destructive">Salir</Button>
								</SimpleButton> 
							: 
								<></>
							} */}
						</div>

						<div className="flex">
							{session ?
								<>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<Image
												src={session.user?.image as string || "/placeholder.svg"}
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
											<DropdownMenuItem><Link href="/jobs">Servicios</Link></DropdownMenuItem>
											<DropdownMenuItem><Link href="/providers">Proveedores</Link></DropdownMenuItem>
											<DropdownMenuSeparator></DropdownMenuSeparator>
											<DropdownMenuLabel>
												<form action={async () => {
													"use server";
													await signOut({redirectTo: "/"});
												}}>
													<Button type="submit" variant="destructive" size="sm">Cerrar sesión</Button>
												</form>
											</DropdownMenuLabel>
										</DropdownMenuContent>
									</DropdownMenu>
								</>
							:
								<>
									<NavLink href="/auth/login">Iniciar sesión</NavLink>
									<NavLink href="/auth/register">Crear cuenta</NavLink>
								</>
							}
							
						</div>
					</div>
					{/* <MobileMenu /> */}
				</div>
			</nav>
			<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{children}
			</main>
		</body>
		</html>
	);
}
