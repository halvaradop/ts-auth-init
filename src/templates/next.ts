
export const codeNextBase = `
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
})
`

export const codeNextHandler = `
import { handlers } from "@/auth"
export const { GET, POST } = handlers
`

export const codeNextMiddleware = `
export { auth as middleware } from "@/auth"
`