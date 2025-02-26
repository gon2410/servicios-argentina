import connect from "@/lib/connect";
import User from "@/lib/models/user";
import Service from "@/lib/models/service";
import { NextResponse } from "next/server"
import { Types } from "mongoose";

export const GET = async (request: Request) => {
    try {
        await connect();

        const {searchParams} = new URL(request.url);
        const action = searchParams.get("action");
        const userId = searchParams.get("userId");
        const serviceId = searchParams.get("serviceId");


        if (!action) {
            // return error if <action> is not specified.
            return new NextResponse(JSON.stringify({message: "Se necesita un parametro <action> valido."}), {status: 400});
        };


        if (action === "all") {
            // get absolutely all services. Even if there is none.
            const services = await Service.find();
            return new NextResponse(JSON.stringify(services), {status: 200});


        }   else if (action === "service") {
                // get specific service. If it does not exist, returns 404
                const service = await Service.findById(serviceId);
                if (!service) {
                    return new NextResponse(JSON.stringify({message: "El servicio no existe en la base de datos."}), {status: 404});
                };

                return new NextResponse(JSON.stringify(service), {status: 200})


        }   else if (action === "users") {
                // get all services of specific user. If the user does no exist, returns 404
                const user = await User.findById(userId);
                if (!user) {
                    return new NextResponse(JSON.stringify({message: "El usuario no existe en la base de datos."}), {status: 404});
                };
            
                const userServices = await Service.find({ user: new Types.ObjectId( userId as string) });
                return new NextResponse(JSON.stringify(userServices), {status:200});


        } else {
            return new NextResponse(JSON.stringify({message: "Algo no esta bien en la peticion."}), {status: 400});
        };


    } catch (error: any) {
        return new NextResponse("Algo no salio bien. Mas detalles: " + error.message, {status: 500});
    };
};

export const POST = async(request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("userId");

        const { title, desc, price } = await request.json();

        if (!title || !desc || !price) {
            return new NextResponse(JSON.stringify({message: "Por favor, complete los campos necesarios."}), {status: 400});
        }
        if (!id || !Types.ObjectId.isValid(id)) {
            return new NextResponse(JSON.stringify({message: "ID not found or invalid."}), {status: 400});
        }

        await connect();
        const user = await User.findById(id);
        if (!user) {
            return new NextResponse(JSON.stringify({message: "User not found in database. La puta madre"}), {status: 404});
        }

        const newService = new Service({
            title,
            desc,
            price,
            user: new Types.ObjectId(id)
        })

        await newService.save();
        return new NextResponse(JSON.stringify({message: "Service created", user: newService}))
    } catch (error: any) {
        return new NextResponse("Error in creating service" + error.message, {status: 500})
    }
}