import { OptionsCLI } from "@/types.js"
import { guessFramework } from "../utils.js"
import { confirm, select } from "@inquirer/prompts"

export const supportedFrameworks = new Map<string, string>([
    ["next", "next-auth"],
    ["qwik", "@auth/qwik"],
    ["svelte", "@auth/sveltekit"],
    ["express", "@auth/express"],
])

export const init = async ({ framework }: OptionsCLI) => {
    const frameworkInstalled = await guessFramework()
    if ((!framework || (framework && !supportedFrameworks.has(framework.toLowerCase()))) && !frameworkInstalled) {
        const selectedFramework = await select<string>({
            message: "Select the framework that you will use in your project",
            choices: [...supportedFrameworks.keys()],
        })
        framework = selectedFramework.toLowerCase()
    }
    console.log(`The framework selected is ${framework}`)
    const install = await confirm({
        message: "Do you want to install the selected framework?",
        default: true,
    })
}
