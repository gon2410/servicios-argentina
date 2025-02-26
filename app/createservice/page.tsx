import CreateService from "@/components/CreateService";
import axios from "axios";
import { auth } from "@/auth";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface Service {
	_id: string;
	title: string;
	desc: string;
	price: string;
}

const page = async () => {
	const session = await auth();
	if (session) {
		try {
			const res = await axios.get(`http://localhost:3000/api/services?action=users&userId=${session?.user?.id}&serviceId=`);
			const services: Service[] = res.data;
			return (
				<>
					<Card>
						<CardHeader>
							<CardTitle>Mis servicios</CardTitle>
							<CardDescription>Lista de tus servicios activos.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{services.map((service) => (
									<div className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full" key={service._id}>
										<Image
											src="/placeholder.svg"
											alt="service_image"
											width={400}
											height={200}
											className="w-full h-48 object-cover"
										/>
										<div className="p-6 flex flex-col flex-grow">
											<h3 className="text-lg font-semibold">{service.title}</h3>
											<p className="text-gray-600 mt-2 flex-grow">{service.desc}</p>
											<div className="mt-4 flex justify-between items-center">
											<span className="text-indigo-600 font-bold">~${service.price}</span>
											{/* <Link
												href={`/provider/${service.user}`}
												className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
												Contact Provider
											</Link> */}
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					
					<CreateService userId={session?.user?.id}/>
				</>
			)
		} catch (error) {
			return (
				<div className="text-center">
					<p>Algo salió mal.</p>
				</div>
			)
		}
	}
	return (
		<div className="text-center">
			<p>Tenés que loguearte o crear una cuenta.</p>
		</div>
	)
}

export default page