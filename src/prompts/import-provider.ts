import { rawlist } from "@inquirer/prompts"
import { setEnvironment } from "../utils.js"

/**
 * Prompts the user to select the provider to be configured in the project.
 *
 * @returns {Promise<string>} - A promise that resolves to the provider selected by the user.
 */
export const selectedProvider = async (): Promise<string> => {
	return rawlist<string>({
		message: "Select the provider to be configured",
		choices: [
			{ name: "GitHub", value: "GITHUB" },
			{ name: "Google", value: "GOOGLE" },
			{ name: "Facebook", value: "FACEBOOK" },
			{ name: "Auth0", value: "AUTH0" },
			{ name: "Apple", value: "APPLE" },
			{ name: "Instagram", value: "INSTAGRAM" },
			{ name: "Slack", value: "SLACK" },
			{ name: "Spotify", value: "SPOTIFY" },
		],
	})
}

/**
 * Main prompt used to build the configuration for the provider selected by the user.
 *
 * @returns {Promise<void>}
 */
export const promptInitProviders = async (): Promise<void> => {
	const provider = await selectedProvider()
	await setEnvironment(`AUTH_${provider}_ID`, "YOUR_PROVIDER_ID")
	await setEnvironment(`AUTH_${provider}_SECRET`, "YOUR_PROVIDER_SECRET")
}
