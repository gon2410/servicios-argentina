import HeaderAuth from "@/components/header-auth";
import { Geist } from "next/font/google";
import Link from "next/link";
import HeaderMenu from "@/components/header-menu";
import "./globals.css";

export const metadata = {
  	metadataBase: "https://localhost:3000/",
  	title: "Servicios Argentina",
  	description: "Aplicación para proveedores de servicios tanto publicos como privados en Argentina",
};

const geistSans = Geist({
  	display: "swap",
  	subsets: ["latin"],
});

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  	return (
		<html lang="en" className={geistSans.className} suppressHydrationWarning>
			<body className="min-h-screen bg-gray-100">
				<nav className="bg-white shadow-md">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-12">
							<div className="flex">
								<Link href="/" className="flex-shrink-0 flex items-center font-bold text-black">Servicios Arg</Link>
							</div>
							<HeaderMenu />

							<HeaderAuth />
						</div>
					</div>
				</nav>
				<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					{children}
				</main>
			</body>
		</html>
  	);
}
