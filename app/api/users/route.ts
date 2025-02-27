import connect from "@/lib/connect"; 
import User from "@/lib/models/user";
import { NextResponse } from "next/server"
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export const GET = async(request: Request) => {
    try {
        await connect();

        const {searchParams} = new URL(request.url);
        const action = searchParams.get("action");
        const userId = searchParams.get("userId");
        const query = searchParams.get("query");

        if (!action) {
            // return error if <action> is not specified.
            return new NextResponse(JSON.stringify({message: "Se necesita un parametro <action> valido."}), {status: 400});
        };

        if (action == "all") {
            // get absolutely all users. Even if there is none.
            const users = await User.find();
            return new NextResponse(JSON.stringify(users), {status: 200});


        } else if (action == "user") {
            // get specific user. If it does not exist, returns 404
            const user = await User.findById(userId);
            if (!user) {
                return new NextResponse(JSON.stringify({message: "El usuario no existe en la base de datos."}), {status: 404});
            }
            return new NextResponse(JSON.stringify(user), {status: 200});


        } else if (action == "userbyname") {
            // get specific users by query of name if exists.
            const users = await User.find({"name": { $regex: query }});
            return new NextResponse(JSON.stringify(users), {status: 200});
        } 
        
        else {
            return new NextResponse(JSON.stringify({message: "Algo no esta bien en la peticion."}), {status: 400});
        };


    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse("Algo no salio bien. Mas detalles: " + error.message, {status: 500})
        }
    };
};

export const POST = async (request: Request) => {
    try {
        await connect();
        const { name, email, password } = await request.json();

        const user = await User.findOne({email})

        if (user) {
            return new NextResponse(JSON.stringify({message: "Ya existe una cuenta registrada con esa direccion de e-mail"}), {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();

        return new NextResponse(JSON.stringify({message: "User created", user: savedUser}))
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse("Algo no salio bien. Mas detalles: " + error.message, {status: 500})
        }
    };
}

export const PATCH = async(request: Request) => {
    try {
        await connect();

        const {userId, newName, newOcupation, newLocation, newBio} = await request.json();

        if (!userId) {
            return new NextResponse(JSON.stringify({message: "Se necesita un ID"}), {status: 400});
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "Invalid user ID."}), {status: 400});
        }

        const updatedUser = await User.findOneAndUpdate(
            {_id: new Types.ObjectId(userId)},
            { $set: { name: newName, ocupation: newOcupation, location: newLocation, bio: newBio } },
            {new: true}
        )

        if (!updatedUser) {
            return new NextResponse(JSON.stringify({message: "User not found in database"}), {status: 400});
        }

        return new NextResponse(JSON.stringify({message: "User updated.", user: updatedUser}), {status: 200});

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse("Algo no salio bien. Mas detalles: " + error.message, {status: 500})
        }
    };
}

export const DELETE = async(request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        if (!userId) {
            return new NextResponse(JSON.stringify({message: "ID not found."}), {status: 400});
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: "Invalid user ID."}), {status: 400});
        }

        // await connect();

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        )

        if (!deletedUser) {
            return new NextResponse(JSON.stringify({message: "User not found in database."}), {status: 400});
        }

        return new NextResponse(JSON.stringify({message: "User deleted.", user: deletedUser}), {status: 200});

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new NextResponse("Algo no salio bien. Mas detalles: " + error.message, {status: 500})
        }
    };
}