import { createSpinner } from "nanospinner"
import { execAsync, setEnvironment } from "../utils.js"
import { OptionsCLI } from "@/types.js"

/**
 * Setup the AUTH_SECRET environment variable  which is mandatory for using Auth.js
 * without considering the framework.
 */
export const secret = async ({ size = 32 }: OptionsCLI): Promise<void> => {
    try {
        const { stdout: randomized } = await execAsync(`openssl rand -base64 ${size}`)
        await setEnvironment({
            comment: "# AUTH-SECRET IS A RANDOM TOKEN TO ENCRYPT TOKENS, EMAILS AND HASHES",
            name: "AUTH_SECRET",
            value: randomized,
        })
    } catch (error) {
        createSpinner("Error").error({ text: "An error occurred while generating the secret key" })
    }
}
