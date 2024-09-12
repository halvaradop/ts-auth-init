import { createSpinner } from "nanospinner"
import { execAsync, setEnvironment } from "../utils.js"

/**
 * Sets up the environment variables used throughout the project, initially creating
 * the AUTH_SECRET variable. This is mandatory for using auth.js without considering
 * the framework.
 */
export const setAuthConfigEnvironment = async (): Promise<void> => {
	try {
		const randomized = await getRandonSecret()
		setEnvironment("AUTH_SECRET", randomized)
	} catch (error) {
		createSpinner("Error").error({ text: "An error occurred while generating the secret key" })
	}
}

/**
 * Generates a random key using OpenSSL to ensure the security of the project.
 * It is highly recommended to use random keys for security reasons.
 *
 * @returns {Promise<string>} The generated secret key
 */
export const getRandonSecret = async (): Promise<string> => {
	const { stdout } = await execAsync("openssl rand -base64 33")
	return stdout
}
