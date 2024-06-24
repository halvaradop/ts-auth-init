
export const getCodeNextBase = `
import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
})
`


export const getCodeNextHandler = (baseConfigPath: string): string => `
import { handlers } from "@/${baseConfigPath}"
export const { GET, POST } = handlers
`


export const getCodeNextMiddleware = (baseConfigPath: string): string => `
export { auth as middleware } from "@/${baseConfigPath}"
`