import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            _id?: string;
            ocupation: string;
            location: string;
            bio: string;

        } & DefaultSession["user"];
    }

    // interface User extends DefaultUser {
    //     _id?: string; // Acepta _id opcionalmente
    //     //ocupation: string;
    // } 
}