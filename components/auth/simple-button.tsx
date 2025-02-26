"use client";

import { useRouter } from "next/navigation";

interface SimpleButtonProps {
    redirectTo: string;
    children: React.ReactNode;
    mode?: "modal" | "redirect",
    asChild?: boolean;
}

export const SimpleButton = ({
    redirectTo,
    children,
    mode = "redirect",
    asChild
}: SimpleButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push(redirectTo)
    }

    if (mode === "modal") {
        return (
            <span>TODO: Implement modal</span>
        )
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
};
