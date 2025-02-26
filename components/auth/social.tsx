"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: "/profile"
        })
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("google")}>
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
                <FaFacebook className="h-5 w-5"/>
            </Button>
        </div>
    )
}