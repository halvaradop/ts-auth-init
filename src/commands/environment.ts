import fs from "fs"
import path from "path"
import { createSpinner } from "nanospinner"
import { execAsync, ROOT } from "../utils.js"


/**
 * Sets up the environment variables used throughout the project, initially creating
 * the AUTH_SECRET variable. This is mandatory for using auth.js without considering
 * the framework.
 */
export const setEnvironment = async () => {
    const environmentPath = path.join(ROOT, ".env")
    const spinner = createSpinner("Setting up the environment variables of the project").start()
    const randomized = await getRandonSecret()
    if(!fs.existsSync(environmentPath)) {
        fs.writeFileSync(environmentPath, `AUTH_SECRET=${randomized}`)
    } else {
        fs.appendFileSync(environmentPath, `AUTH_SECRET=${randomized}`)
    }
    spinner.success({
        text: "The environments was established"
    })
}


/**
 * Generates a random key using OpenSSL to ensure the security of the project.
 * It is highly recommended to use random keys for security reasons.
 * 
 * @returns {Promise<string>} The generated secret key
 */
const getRandonSecret = async () => {
    const { stdout } = await execAsync("openssl rand -base64 33")
    return stdout
}