import { createSpinner } from "nanospinner"
import { execAsync, writeConfig } from "../utils.js"
import { Framework } from "../types.js"
import { frameworkCode, frameworkInstall } from "./frameworks.js"



/**
 * Initialize the set of configuration for a framework, like:
 *  - NextJs
 *  - SvelteKit
 *  - Express
 * 
 * @param framework the configuration of the framework
 */
export const initializeAuth = async (framework: Framework, create: boolean, fileName: string) => {
    installFrameworkAuth(framework)
    const configFramework = frameworkCode[framework]
    if (create) {
        configFramework.map(({ path, content }) => writeConfig(path, content))
    }
}


/**
 * Installs the necessary dependencies for the selected framework
 * from the terminal.
 * 
 * @param framework The framework chosen by the user
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