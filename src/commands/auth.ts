import { createSpinner } from "nanospinner"
import { execAsync, writeConfig } from "../utils.js"
import { Framework } from "../types.js"
import { frameworkInstall, getCodeByFramework } from "./frameworks.js"


/**
 * Initializes the set of configurations for a specified framework, such as:
 *  - NextJs
 *  - SvelteKit
 *  - Express
 *
 * This function installs the necessary authentication dependencies for the chosen framework
 * and optionally creates configuration files.
 * 
 * @param {Framework} framework - The framework to initialize (NextJs, SvelteKit, Express).
 * @param {boolean} create - Whether to create configuration files.
 * @param {string} baseConfigPath - The name of the configuration file to be created.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
export const initializeAuth = async (framework: Framework, create: boolean, baseConfigPath: string): Promise<void> => {
    installFrameworkAuth(framework)
    if (create) {
        const configFramework = getCodeByFramework(framework, baseConfigPath)
        configFramework.map(({ path, content }) => writeConfig(path, content))
    }
}


/**
 * Installs the necessary dependencies for the selected framework from the terminal.
 * 
 * @param {Framework} framework - The framework chosen by the user (NextJs, SvelteKit, Express).
 * @returns {Promise<void>} A promise that resolves when the installation is complete.
 */
export const installFrameworkAuth = async (framework: Framework): Promise<void> => {
    const install = frameworkInstall[framework]
    const spinner = createSpinner(`Installing ${framework} package`).start()
    try {
        await execAsync(install)
        spinner.success({ text: "The package was installed successfully" })
    } catch(error) {
        spinner.error({ text: "An error occurred while installing the package" })
    }
}