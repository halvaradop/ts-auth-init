import { codeExpress } from "../templates/express.js"
import { codeNextJs } from "../templates/next.js"
import { codeSvelteKit } from "../templates/svelte.js"
import { Framework } from "../types.js"

/**
 * The code to be printed in the files at the moment
 * to create the auth.ts configuration file
 */
export const frameworkCode: Record<Framework, string> = {
    "NextJs": codeNextJs(),
    "SvelteKit": codeSvelteKit(),
    "Express": codeExpress()
}


/**
 * The command to be executed to install the dependencides of a framework
 */
export const frameworkInstall: Record<Framework, string> = {
    "NextJs": "npm i next-auth@beta",
    "SvelteKit": "npm i @auth/sveltekit",
    "Express": "npm i @auth/express"
}