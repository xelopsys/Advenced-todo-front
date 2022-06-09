import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect } from "react"
import { useRouter } from 'next/router'
import { AiOutlineGithub } from "react-icons/ai";

export default function Login() {
    const router = useRouter()

    const { data: session } = useSession()


    useEffect(() => {
        if (session) {
            (
                router.push('/')
            )
        }
    }, [session])

    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center">
            <button onClick={() => signIn()} className=" bg-black text-white rounded w-56 h-12 flex flex-row justify-center items-center">
                <AiOutlineGithub className="mx-3 h-22" />
                Sign in with GitHub
            </button>
        </div>
    )
}