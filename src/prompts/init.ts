import { confirm, input, select } from "@inquirer/prompts"
import { Framework } from "../types.js"
import { initializeAuth } from "../commands/auth.js"


const selectFramework = async () => {
    return await select<Framework>({
        message: "Select the framework that you will use in your project",
        choices: [
            { name: "NextJs", value: "NextJs" },
            { name: "SvelteKit", value: "SvelteKit" },
            { name: "Express", value: "Express" },
        ]
    })
}


const confirmConfigurationCreation = async () => {
    return await confirm({
        message: "You want to create file configuration ?",
    })
}


const fileName = async () => {
    return await input({
        message: "Name of the configuration file",
        default: "auth.ts"
    })
}

export const promptInitConfig = async () => {
    const framework = await selectFramework()
    const configuration = await confirmConfigurationCreation()
    const fileNameConfig = await fileName()
    return initializeAuth(framework, configuration, fileNameConfig)
}