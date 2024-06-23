
export const codeSvelteKit = () => `
import { SvelteKitAuth } from "@auth/sveltekit"
 
export const { handle } = SvelteKitAuth({
    providers: [],
})
`