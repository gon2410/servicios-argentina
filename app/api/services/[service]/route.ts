import connect from "@/lib/connect";
import User from "@/lib/models/user";
import Service from "@/lib/models/service";
import { NextResponse } from "next/server"
import { Types } from "mongoose";

export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { title } = body;

        const {searchParams} = new URL(request.url);
        const serviceId = searchParams.get("serviceId");
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "ID not found or invalid."}), {status: 400});
        }

        if (!serviceId || !Types.ObjectId.isValid(serviceId)) {
            return new NextResponse(JSON.stringify({message: "Service not found or invalid."}), {status: 400});
        }

        await connect();

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({message: "User not found in database."}), {status: 404});
        }

        const service = await Service.findOne({_id: serviceId, user: userId});

        if (!service) {
            return new NextResponse(JSON.stringify({message: "Service not found in database."}), {status: 404});
        }

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            { title },
            { new: true }
        )

        return new NextResponse(JSON.stringify({message: "Service updated", category: updatedService}))

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse("Error in fetching categories" + error.message, {status: 500})
        }
    }
}

export const DELETE = async (request: Request, context: { params: any }) => {
    const serviceId = context.params.category;
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "ID not found or invalid."}), {status: 400});
        }

        if (!serviceId || !Types.ObjectId.isValid(serviceId)) {
            return new NextResponse(JSON.stringify({message: "Service not found or invalid."}), {status: 400});
        }

        await connect();

        const user = await User.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({message: "User not found in database."}), {status: 404});
        }

        const service = await Service.findOne({_id: serviceId, user: userId});
        if (!service) {
            return new NextResponse(JSON.stringify({message: "Service not found."}), {status: 400});
        }

        const deletedService = await Service.findByIdAndDelete(serviceId);
        return new NextResponse(JSON.stringify({message: "Service deleted", category: deletedService}));

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse("Error in deleting categories: " + error.message, {status: 500})
        }
    }
}