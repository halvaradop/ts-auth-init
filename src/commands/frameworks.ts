import { codeExpressBase } from "../templates/express.js"
import { codeNextBase, codeNextMiddleware, codeNextHandler } from "../templates/next.js"
import { codeSvelteKitBase, codeSvelteKitHandler } from "../templates/svelte.js"
import { Framework, PathFile } from "../types.js"

/**
 * The code to be printed in the files at the moment
 * to create the auth.ts configuration file
 */
export const frameworkCode: Record<Framework, PathFile[]> = {
    "NextJs": [
        { path: "auth.ts", content: codeNextBase },
        { path: "app/api/auth/[...nextauth]/route.ts", content: codeNextHandler },
        { path: "middleware.ts", content: codeNextMiddleware }
    ],
    "SvelteKit": [
        { path: "auth.ts", content:  codeSvelteKitBase },
        { path: "src/hooks.server.ts", content: codeSvelteKitHandler }
    ],
    "Express": [
        { path: "auth.ts", content: codeExpressBase }
    ]
}


/**
 * The command to be executed to install the dependencides of a framework
 */
export const frameworkInstall: Record<Framework, string> = {
    "NextJs": "npm i next-auth@beta",
    "SvelteKit": "npm i @auth/sveltekit",
    "Express": "npm i @auth/express"
}