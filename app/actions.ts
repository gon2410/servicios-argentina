"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = await createClient();
    const origin = (await headers()).get("origin");

	if (!email || !password) {
		return encodedRedirect(
			"error",
			"/sign-up",
			"Email and password are required",
		);
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		console.error(error.code + " " + error.message);
		return encodedRedirect("error", "/sign-up", error.message);
	} else {
		const { error } = await supabase.from('profiles').insert([{owner: email}]);
		if (error) {
			console.log(error);
		}
		return encodedRedirect(
			"success",
			"/sign-up",
			"Listo! Para iniciar sesion es necesario que verifiques tu email",
		);
	}
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return encodedRedirect("error", "/sign-in", error.message = "Credenciales incorrectas");
	}

	return redirect("/");
};

export const googleAction = async() => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
		  redirectTo: 'http://example.com/auth/callback',
		},
	})
	  
	if (data.url) {
	redirect(data.url) // use the redirect API for your server framework
	}
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = await createClient();

	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!password || !confirmPassword) {
		encodedRedirect(
		"error",
		"/protected/reset-password",
		"Se requiere la nueva contraseña y la confirmacion",
		);
	}

	if (password !== confirmPassword) {
		encodedRedirect(
		"error",
		"/protected/reset-password",
		"Las contraseñas no coinciden",
		);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		encodedRedirect(
		"error",
		"/protected/reset-password",
		"Error al resetar la contraseña",
		);
	}

	encodedRedirect("success", "/protected/reset-password", "Contraseña reseteada");
};

export const signOutAction = async () => {
  	const supabase = await createClient();
  	await supabase.auth.signOut();
  	return redirect("/sign-in");
};


export const updateServiceAction = async (formData: FormData) => {
    const supabase = await createClient();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;

    const { data, error } = await supabase.from('services')
    .update({ title: title, price: price, description: description })
    .eq('id', id)
    
    if (error) {
		console.log(error)
		return { success: false, message: "Error al actualizar el servicio" };
    }
    return { success: true, message: "Servicio actualizado" };
};

export const updateProfileAction = async (formData: FormData) => {
	const supabase = await createClient();

	const id = formData.get("id") as string;
	const name = formData.get("name") as string;
	const ocupation = formData.get("ocupation") as string;
	const location = formData.get("location") as string;
	const bio = formData.get("bio") as string;

	const { data, error } = await supabase.from('profiles')
	.update({ name: name, ocupation: ocupation, location: location, bio: bio })
	.eq('id', id);

	if (error) {
		return { success: false, message: "Error al actualizar el perfil"}
	}

	return { success: true, message: "Perfil actualizado"}
};

export const createServiceAction = async (formData: FormData) => {
	const supabase = await createClient();

	const newTitle = formData.get("title") as string;
	const newPrice = formData.get("price") as string;
	const newDescription = formData.get("description") as string;
	const newOwner = formData.get("owner") as string;

	const { error } = await supabase.from('services').insert([{ title: newTitle, price: newPrice, description: newDescription, owner: newOwner }]);

	if (error) {
		return {success: false, message: "No se pudo crear el servicio."}
	}

	return { success: true, message: "Servicio creado exitosamente" }
};

export const updateProfilePicAction = async (formData: FormData) => {
	try {
		const file = formData.get("upload_file") as File;
		const email = formData.get("email") as string;
		
		if (!file || !email) throw new Error("No se encontró un archivo o email.")

		const supabase = await createClient()
	
		const URL = `${email}/${file.name}`;
	
		// retrieve URL in the image_url field in profile
		const { data: imageURL, error: retrievingError } = await supabase.from("profiles").select("image_url").eq("owner", email).single();
		if (retrievingError) throw new Error("Algo salió mal buscando la URL de la imagen en tu perfil.");

		// removing image_url saved in supabase storage
		const { error: removingError} = await supabase.storage.from("servicios-argentina").remove([imageURL?.image_url]);
		if (removingError) throw new Error("Algo salió mal eliminando la imagen de la base de datos.");

		// updating image_url in supabase storage
		const { error: updatingStorageError } = await supabase.storage.from('servicios-argentina').upload(URL, file);
		if (updatingStorageError) throw new Error("Algo salió mal actualizando la imagen en el storage.");

		// updating URL in the image_url field in profile
		const {error: updateError} = await supabase.from("profiles").update({image_url: URL}).eq("owner", email);
		if (updateError) throw new Error("Algo salió mal actualizando la imagen");

		return {success: true, message: "Imagen actualizada."}
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {success: false, message: error.message}
		}
	}
};