import Image from 'next/image'
import Link from 'next/link'
import axios, { AxiosError } from 'axios';

interface Service {
  _id: string;
  title: string;
  desc: string;
  price: string;
  user: string;
}

const JobList = async () => {
	try {
		const res = await axios.get("https://servicios-argentina-peot.vercel.app/api/services?action=all&userId=&serviceId=");
		const services: Service[] = res.data;

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{services.map((service) => (
				<div key={service._id} className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full">
					<Image
						src="/placeholder.svg"
						alt={service.title}
						width={400}
						height={200}
						className="w-full h-48 object-cover"
					/>
					<div className="p-6 flex flex-col flex-grow">
						<h3 className="text-lg font-semibold">{service.title}</h3>
						<p className="text-gray-600 mt-2 flex-grow">{service.desc}</p>
						<div className="mt-4 flex justify-between items-center">
						<span className="text-indigo-600 font-bold">~${service.price}</span>
						<Link
							href={`/jobs/${service._id}`}
							className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
							Detalles
						</Link>
						</div>
					</div>
				</div>
			))}
			</div>
		)
	} catch (error) {
		if (error instanceof AxiosError) {
			return (
				<p className='text-center'>{error.response?.data}</p>
			)
		}

	}
	
}

export default JobList;