import { auth } from "@/auth";
import Image from "next/image";
import EditProfile from "@/components/EditProfile";

const page = async () => {
    const session = await auth();
	if (session) {
		return (
			<>
				<div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto m-2">
					<div className="p-8">
						<div className="mb-6 flex flex-row justify-center">
							<Image
								src={session?.user?.image as string || "/placeholder.svg"}
								alt="profile_image"
								width={150}
								height={150}
								className="rounded-full"
							/>
						</div>
						<h2 className="text-2xl font-bold text-center mb-2">{session?.user?.name}</h2>
						<p className="text-gray-600 text-center mb-1">{session.user?.ocupation}</p>
						<p className="text-gray-600 text-center mb-4">{session.user?.location}</p>
						<p className="text-gray-700 text-center mb-6">{session.user?.bio}</p>
						<div className="flex justify-center space-x-2">
							<EditProfile userId={session.user?.id as string} name={session.user?.name as string} ocupation={session.user?.ocupation} location={session.user?.location} bio={session.user?.bio}/>
						</div>
					</div>
				</div>
			</>
		)
	}
	return (
		<div className="text-center">
			<p>Tenes que loguearte o crear una cuenta.</p>
		</div>
	)
}

export default page;