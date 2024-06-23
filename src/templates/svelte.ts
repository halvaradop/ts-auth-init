
export const codeSvelteKitBase = `
import { SvelteKitAuth } from "@auth/sveltekit"
 
export const { handle } = SvelteKitAuth({
    providers: [],
})
`

export const codeSvelteKitHandler = `
export { handle } from "./auth"
`