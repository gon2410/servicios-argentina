import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
	searchParams: Promise<Message>;
	}) {
  	const searchParams = await props.searchParams;
    if ("message" in searchParams) {
		return (
			<div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
				<FormMessage message={searchParams} />
			</div>
		);
    }

  	return (
		<div className="flex h-full w-full flex-col items-center">
			<Card>
				<CardHeader className="font-bold">
					<div className="w-full flex flex-col gap-y-4 items-center justify-center">
            			<h1 className="text-3xl font-semibold">Servicios Argentina</h1>
            			<p className="text-muted-foreground text-sm">Bienvenido!</p>
        			</div>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col min-w-64 max-w-64 mx-auto">
						<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
						<Label htmlFor="email">Email</Label>
						<Input name="email" placeholder="juanperez@ejemplo.com" required />
						<Label htmlFor="password">Contraseña</Label>
						<Input
							type="password"
							name="password"
							placeholder="******"
							minLength={6}
							required
						/>
						<SubmitButton formAction={signUpAction} pendingText="Creando cuenta...">
							Crear cuenta
						</SubmitButton>
						<FormMessage message={searchParams} />
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text text-foreground">
						Ya tenés cuenta?{" "}
						<Link className="text-primary font-medium underline" href="/sign-in">
							Iniciar sesión
						</Link>
					</p>
				</CardFooter>
			</Card>
			
			{/* <SmtpMessage /> */}
    	</div>
  	);
}
