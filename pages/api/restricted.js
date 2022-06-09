import { getSession } from "next-auth/react"
import { useRouter } from 'next/router'

export default async (req, res) => {
    const router = useRouter()

    const session = await getSession({ req })

    if (session) {
        router.push('/')
    } else {
        router.push('/login')
    }
}