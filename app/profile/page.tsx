import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import EditProfile from "@/components/edit-profile";

const page = async () => {
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getUser();
    if (user.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('owner', user.user.email).single();

        if (profile) {
            return (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto m-2">
                    <div className="p-8">
                        <div className="mb-6 flex flex-row justify-center">
                            <Image
                                src={"/placeholder.svg"}
                                alt="profile_image"
                                width={150}
                                height={150}
                                className="rounded-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-2">{profile.name}</h2>
                        <p className="text-gray-600 text-center mb-1">{profile.ocupation}</p>
                        <p className="text-gray-600 text-center mb-4">{profile.location}</p>
                        <p className="text-gray-700 text-center mb-6">{profile.bio}</p>
                        <div className="flex justify-center space-x-2">
                            <EditProfile id={profile.id} name={profile.name} ocupation={profile.ocupation} location={profile.location} bio={profile.bio}/>
                        </div>
                    </div>
                </div>
            )
        }
    }

    
}

export default page;