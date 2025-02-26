import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db";
import { LoginSchema } from "@/schemas";
import connect from "@/lib/connect";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: MongoDBAdapter(client),
	providers: [
		Google,
		Credentials({
			credentials: {
				email: {},
                password: {}
			},
			authorize: async (credentials) => {
				if (credentials) {
					const validatedFields = LoginSchema.safeParse(credentials);

					// const { email, password } = await LoginSchema.parseAsync(credentials)
					if (validatedFields.success) {
						await connect();
						const user = await User.findOne({email: credentials.email});
	
						if (!user) {
							throw new Error("El usuario no existe.")
						}
	
						const passwordMatch = await bcrypt.compare(credentials.password as string, user.password);
	
						if (!passwordMatch) {
							throw new Error("Contraseña incorrecta.")
						}

						return user;
					}
				}				
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user, session, trigger }) => {
			if (trigger === 'update') {
			  return {
				...token,
				...session.user,
			  }
			}
			if (user) {
			  token = {
				...token,
				...user,
			  }
			}
			return token
		}
	},
	// 	async session({ session, token }) {
	// 		session.user.id = token.id as string;
	// 		session.user.email = token.email as string;
	// 		session.user.name = token.name;
	// 		console.log("Session from auth:", session)
	// 		return session;
	// 	}
	// },
	pages: {
		signIn: "/auth/login"
	}

})