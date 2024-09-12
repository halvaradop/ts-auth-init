import { confirm, input, select } from "@inquirer/prompts"
import { ConfigBase, Framework } from "../types.js"
import { initializeAuth } from "../commands/auth.js"

/**
 * Prompts the user to select the framework to be used in the project.
 *
 * @returns {Promise<Framework>} - A promise that resolves to the choice selected by the user.
 */
const selectFramework = async (): Promise<Framework> => {
	return await select<Framework>({
		message: "Select the framework that you will use in your project",
		choices: [
			{ name: "NextJs", value: "NextJs" },
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
const confirmConfigurationCreation = async (): Promise<boolean> => {
	return await confirm({
		message: "You want to create file configuration ?",
	})
}

/**
 * Prompts the user to write the name of the configuration file.
 *
 * @returns {Promise<string>} - A promise that resolves to the name for the configuration file.
 */
const fileName = async (): Promise<string> => {
	return await input({
		message: "Name of the configuration file",
		default: "auth.ts",
	})
}

/**
 * Unifies the basic prompts to be asked to the user when initializing
 * the project using the --init flag.
 *
 * @returns {Promise<ConfigBase>} - A promise that resolves to the user's selected configuration.
 */
export const promptInitConfig = async (): Promise<ConfigBase> => {
	const framework = await selectFramework()
	const configuration = await confirmConfigurationCreation()
	const baseConfigPath = await fileName()
	initializeAuth(framework, configuration, baseConfigPath)
	return {
		framework,
		baseConfigPath,
	}
}
