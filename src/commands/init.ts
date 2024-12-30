import { OptionsCLI } from "@/types.js"
import { createInternalSpinner, execAsync, getPackageManager, guessFramework } from "../utils.js"
import { confirm, select } from "@inquirer/prompts"

export const supportedFrameworks = new Map<string, string>([
    ["next", "next-auth"],
    ["qwik", "@auth/qwik"],
    ["svelte", "@auth/sveltekit"],
    ["express", "@auth/express"],
])

/**
 * Setup the basic configuration with the Auth.js support version for the selected framework
 *
 * @param {OptionsCLI} framework - The framework to be installed
 */
export const init = async ({ framework }: OptionsCLI) => {
    const frameworkInstalled = await guessFramework()
    let frameworkToInstall = framework ?? frameworkInstalled ?? ""
    if ((!framework || (framework && !supportedFrameworks.has(framework.toLowerCase()))) && !frameworkInstalled) {
        frameworkToInstall = await select<string>({
            message: "Please select the framework you are using in your project:",
            choices: [...supportedFrameworks.keys()],
        })
    }
    const pkgAuth = supportedFrameworks.get(frameworkToInstall)
    const install = await confirm({
        message: `Would you like to install ${pkgAuth} for the ${frameworkToInstall} framework?`,
        default: true,
    })
    if (install) {
        const packageManager = getPackageManager()
        let pkgSelected = packageManager
        const confirmPkg = await confirm({
            message: `Would you like to use ${packageManager} to install ${pkgAuth}?`,
            default: true,
        })
        if (!confirmPkg) {
            pkgSelected = await select<string>({
                message: `Please select the package manager to install ${pkgAuth}:`,
                choices: ["npm", "pnpm", "yarn", "bun"],
            })
        }
        createInternalSpinner(
            async () => {
                await execAsync(`${pkgSelected} add ${supportedFrameworks.get(frameworkToInstall!)}`)
            },
            {
                initial: `Running ${pkgSelected} add ${supportedFrameworks.get(frameworkToInstall!)}...`,
                success: `${pkgAuth} has been installed successfully!
                \rFor more information, please visit the official documentation: https://authjs.dev/getting-started/installation`,
            },
        )
    }
}
