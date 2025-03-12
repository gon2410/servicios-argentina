import { signInAction, googleAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default async function Login(props: { searchParams: Promise<Message> }) {
  	const searchParams = await props.searchParams;
	const supabase = await createClient();
	const { data: { user },} = await supabase.auth.getUser();
	if (user) {
		return redirect("/protected");
	}
  	return (
		<div className="flex h-full w-full flex-col items-center">
			<Card>
				<CardHeader className="font-bold">
					<div className="w-full flex flex-col gap-y-4 items-center justify-center">
            			<h1 className="text-3xl font-semibold">Servicios Argentina</h1>
            			<p className="text-muted-foreground text-sm">Bienvenido de vuelta!</p>
        			</div>
					{/* <div className="text-center">
						<form>
							<Button type="submit" formAction={googleAction} variant={"outline"}><FcGoogle className="h-5 w-5 me-1"/>Google</Button>
						</form>
					</div> */}
				</CardHeader>
				<CardContent>
					<form className="flex-1 flex flex-col min-w-64">
						<div className="flex flex-col gap-2 [&>input]:mb-3">
							<Label htmlFor="email">Email</Label>
							<Input name="email" placeholder="juanperez@ejemplo.com" required />
							<div className="flex justify-between items-center">
								<Label htmlFor="password">Contraseña</Label>
								<Link
									className="text-xs text-foreground underline"
									href="/forgot-password">
									Olvidaste la contraseña?
								</Link>
							</div>
							<Input
								type="password"
								name="password"
								placeholder="******"
								required
							/>
							<SubmitButton pendingText="Validando..." formAction={signInAction}>
								Iniciar sesion
							</SubmitButton>
							<FormMessage message={searchParams} />
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-foreground">
						No tenes cuenta?{" "}
						<Link className="text-foreground font-medium underline" href="/sign-up">
						Crear cuenta
						</Link>
					</p>
	
				</CardFooter>
			</Card>
		</div>
	);
}
