import { createSpinner } from "nanospinner"
import { execAsync, setEnvironment } from "../utils.js"

/**
 * Sets up the environment variables used throughout the project, initially creating
 * the AUTH_SECRET variable. This is mandatory for using auth.js without considering
 * the framework.
 */
export const setAuthConfigEnvironment = async (size: number = 32): Promise<void> => {
	try {
		const { stdout: randomized } = await execAsync(`openssl rand -base64 ${size}`)
		setEnvironment("AUTH_SECRET", randomized)
	} catch (error) {
		createSpinner("Error").error({ text: "An error occurred while generating the secret key" })
	}
}
