import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db";
import { LoginSchema } from "@/schemas";
import connect from "@/lib/connect";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";


class InvalidLoginError extends CredentialsSignin {
	code = "Invalid identifier or password"
  }
  
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
				try {
					let user = null;

					const { email, password } = await LoginSchema.parseAsync(credentials)
					await connect();
					user = await User.findOne({email: email});

					if (!user) {
						throw new InvalidLoginError();
					}

					const passwordMatch = await bcrypt.compare(password as string, user.password);

					if (!passwordMatch) {
						throw new InvalidLoginError();
					}

					return user;
				} catch (error) {
					if (error instanceof ZodError) {
						return null
					}
				}
				
			}
		})
	],
	session: {
		strategy: "jwt"
	},
	callbacks: {
		async session({ session, token }) {
			// console.log("Session callback ejecutado - Token:", token);

			await connect();
			const user = await User.findById(token.sub);

			session.user.id = token.sub as string;
			session.user.name = token.name;
			session.user.email = token.email as string;
			session.user.ocupation = user.ocupation;
			session.user.location = user.location;
			session.user.bio = user.bio;

			// console.log("SESSION:", session)
			return session;
		}
	},
	pages: {
		signIn: "/auth/login"
	}
});