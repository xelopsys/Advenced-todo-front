import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { config } from "../../../config"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: config.GITHUB_ID || process.env.GITHUB_ID,
            clientSecret: config.GITHUB_SECRET || process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    jwt: {
        signinKey: config.JWT_SIGNING_PRIVATE_KEY || process.env.JWT_SIGNING_PRIVATE_KEY,
    }
})