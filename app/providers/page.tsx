import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
const page = async () => {
    const supabase = await createClient();
    const { data: providers } = await supabase.from('profiles').select('*');

    if (providers) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                    <div key={provider.owner} className="bg-white shadow rounded-lg overflow-hidden m-2 flex flex-col h-full">
                        <div className="flex flex-1 justify-between p-3">
                            <Image
                                src={"/placeholder.svg"}
                                alt={provider.name}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <h3 className="text-lg font-semibold">{provider.name}</h3>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
    						<p className="text-gray-600 mt-2 flex-grow">{provider.ocupation}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="font-bold">{provider.location}</span>
                                <Link
                                    href={`/providers/${provider.owner}`}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                                    Ver mas
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    
}

export default page