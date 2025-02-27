import { signIn, auth } from "@/auth";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Register from "@/components/Register";


const page = async() => {
	const session = await auth();
	if (session) {
		return (
			<div className="text-center">
				<p>Ya estas logueado {session.user?.name}</p>
			</div>
		)
	}
    return (
		<div className="flex h-full flex-col items-center justify-center">
			<Card className="w-[400px] shadow-md">
				<CardHeader><Header label="Bienvenido!" /></CardHeader>
				<CardContent>
					<Register />
				</CardContent>

				<CardFooter className="flex justify-center">
					
				</CardFooter>
			</Card>
			<div className="mt-10">
				<p className="font-bold text-sm">o registrarse con cuenta de Google (recomendado).</p>
			</div>
			<div className="w-[400px] mt-10">
				<form action={async () => {
								"use server";
								await signIn("google", { redirectTo: "/" });
							}}>	
								<Button type="submit" variant="outline" className="font-bold w-[400px]">
									<FcGoogle className="h-5 w-5"/>
									Google
								</Button>
				</form>
			</div>
		</div>
    )
}

export default page;