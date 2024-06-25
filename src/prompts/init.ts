import { confirm, input, select } from "@inquirer/prompts"
import { ConfigBase, Framework } from "../types.js"
import { initializeAuth } from "../commands/auth.js"
import { setEnvironment } from "../utils.js"


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

export const promptInitConfig = async (): Promise<ConfigBase> => {
    const framework = await selectFramework()
    const configuration = await confirmConfigurationCreation()
    const baseConfigPath = await fileName()
    initializeAuth(framework, configuration, baseConfigPath)
    return {
        framework,
        baseConfigPath
    }
}