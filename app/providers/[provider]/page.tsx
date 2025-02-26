import axios from "axios";
import Image from "next/image";
import { auth } from "@/auth";

interface User {
    name: string;
    email: string;
    image: string;
    bio: string;
    location: string;
    ocupation: string;
}

const page = async({ params }: {params: Promise<{ provider: string }>}) => {
    const session = await auth();
    if (session) {
        try {
            const id = (await params).provider;
            const response = await axios.get(`http://localhost:3000/api/users?action=user&userId=${id}`);
            const user: User = response.data;

            return (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto m-2">
                    <div className="p-8">
                        <div className="mb-6 flex flex-row justify-center">
                            <Image
                                src={user?.image || "/placeholder.svg"}
                                alt="profile_image"
                                width={150}
                                height={150}
                                className="rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-2">{user?.name}</h2>
                        <p className="text-gray-600 text-center mb-1">{user?.ocupation}</p>
                        <p className="text-gray-600 text-center mb-4">{user?.location}</p>
                        <p className="text-gray-700 text-center mb-6">{user?.bio}</p>
                    </div>
                </div>
            )
        } catch (error) {
            <div className="text-center">
                <p>Algo salió nal</p>
            </div>
        }
    } else {
        return (
            <div className="text-center">
                <p>Es necesario crear una cuenta o loguearse si queres ver el perfil del proveedor.</p>
            </div>
        )
    }
}

export default page;