import { confirm, input, select } from "@inquirer/prompts"
import { Framework } from "../types.js"
import { initializeAuth } from "../commands/auth.js"

/**
 * Prompts the user to select the framework to be used in the project.
 *
 * @returns {Promise<Framework>} - A promise that resolves to the choice selected by the user.
 */
const frameworkSelection = async (): Promise<Framework> => {
	return select<Framework>({
		message: "Select the framework that you will use in your project",
		choices: [
			{ name: "Next.js", value: "NextJs" },
			{ name: "SvelteKit", value: "SvelteKit" },
			{ name: "Express", value: "Express" },
		],
	})
}

/**
 * Prompts the user to confirm if they want the initializer to create the
 * configuration file.
 *
 * @returns {Promise<boolean>} - A promise that resolves to the user's confirmation.
 */
const confirmConfigurationFile = async (): Promise<boolean> => {
	return confirm({ message: "Do you want to create the configuration file?" })
}

/**
 * Prompts the user to input the name of the configuration file.
 *
 * @returns {Promise<string>} - A promise that resolves to the name of the configuration file.
 */
const configFileName = async (): Promise<string> => {
	return input({
		message: "Enter the name of the configuration file:",
		default: "auth.ts",
	})
}

/**
 * Unifies the basic prompts to be asked to the user when initializing
 * the project using the --init flag.
 *
 */
export const promptInitConfig = async () => {
	const framework = await frameworkSelection()
	const configuration = await confirmConfigurationFile()
	const baseConfigPath = await configFileName()
	initializeAuth(framework, configuration, baseConfigPath)
}
