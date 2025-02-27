import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Service {
    _id: string;
    title: string;
    desc: string;
    price: string;
    user: string;
};

interface User {
    _id: string;
    name: string;
    email: string;
    image: string;
};

const page = async({ params }: {params: Promise<{ jobs: string }>}) => {
    const id = (await params).jobs;

    const serviceResponse = await axios.get(`https://servicios-argentina-peot.vercel.app/api/services?action=service&userId=&serviceId=${id}`);
	const service: Service = serviceResponse.data;

    const userResponse = await axios.get(`https://servicios-argentina-peot.vercel.app/api/users?action=user&userId=${service.user}`);
    const user: User = userResponse.data;

    return (        
        <Card>
            <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.desc}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Costo: ~${service.price}</p>
            </CardContent>
            <CardFooter className="flex">
                <Image
                    src={user.image}
                    alt="profile_image"
                    width={30}
                    height={30}
                    className="rounded-full m-2"
                />
                <Link href={`/providers/${user._id}`}>{user.name}</Link>
            </CardFooter>   
        </Card>
    );
};

export default page;