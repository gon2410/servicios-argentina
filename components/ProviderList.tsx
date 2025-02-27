import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Provider {
    _id: string;
	name: string;
    email: string;
    image: string;
	ocupation: string;
	location: string;
}

const ProviderList = async () => {
	try {
		const res = await axios.get("http://localhost:3000/api/users?action=all&userId=");
		const providers: Provider[] = await res.data;
		return (
			<div className="flex mt-10">
				{providers.map(provider =>
					<Card key={provider._id} className="w-80 h-64 flex flex-col justify-between">
						<CardHeader className="flex-1">
							<CardTitle className="flex items-center space-x-2">
								<Image src={provider.image || "/placeholder.svg"} alt={provider.name} width={40} height={40} className="w-10 h-10 object-cover rounded-full" />
								<h3 className="text-lg font-semibold">{provider.name}</h3>
							</CardTitle>
							<CardDescription>{provider.location}</CardDescription>
						</CardHeader>
						<CardFooter className="flex justify-between">
							<p className="text-gray-600 mt-2">{provider.ocupation}</p>
							<Link href={`/providers/${provider._id}`} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
								Ver Perfil
							</Link>
						</CardFooter>
					</Card>
				)}
			</div>
		)
	} catch (error) {
		return (
			<p>Algo salió mal...</p>
		)
	}
    
}

export default ProviderList;
