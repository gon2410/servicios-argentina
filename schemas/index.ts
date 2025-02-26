import * as z from "zod";

export const ServiceSchema = z.object({
    title: z.string().min(1, {
        message: "Se requiere un titulo o nombre del servicio."
    }),
    desc: z.string().min(1, {
        message: "Se requiere una descripcion del servicio."
    }),
    price: z.string().min(1, {
        message: "Se requiere un precio del servicio."
    })
});

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Se requiere un nombre y apellido."
    }),
    email: z.string().email({
        message: "Se requiere una direccion de correo"
    }),
    password: z.string().min(1, {
        message: "Se requiere una contraseña"
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Se requiere una direccion de correo."
    }),
    password: z.string().min(1, {
        message: "Se requiere una contraseña."
    })
});

export const UpdateProfileSchema = z.object({
    name: z.string().min(1, {
        message: "Se requiere un nombre y apellido"
    }),
    ocupation: z.string().min(1, {
        message: "Se requiere una ocupación"
    }),
    location: z.string().min(1, {
        message: "Se requiere una ubicación"
    }),
    bio: z.string().min(1, {
        message: "Se requiere una biografia"
    })
});

export const SearchSchema = z.object({
    query: z.string().min(1, {
        message: "Se requiere un valor a buscar"
    })
})