import { rawlist } from "@inquirer/prompts"
import { addImportProviders, getConfiguration, setEnvironment } from "../utils.js"


/**
 * Prompts the user to select the provider to be configured in the project.
 * 
 * @returns {Promise<Capitalize<string>>} - A promise that resolves to the provider selected by the user.
 */
export const getProvider = async (): Promise<Capitalize<string>> => {
    return await rawlist<Capitalize<string>>({
        message: "Select the providers to be configurated",
        choices: [
            { name: "Github", value: "GITHUB" },
            { name: "Google", value: "GOOGLE" },
            { name: "Facebook", value: "FACEBOOK" },
            { name: "Auth0", value: "AUTH0" },
            { name: "Apple", value: "APPLE" },
            { name: "Instagram", value: "INSTAGRAM" },
            { name: "Slack", value: "SLACE" },
            { name: "Spotify", value: "SPOTIFY" },
        ]
    })
}


/**
 * Main prompt used to build the configuration for the provider selected by the user.
 * 
 * @returns {Promise<void>}
 */
export const promptInitProviders = async () => {
    const provider = await getProvider()
    const { framework, baseConfigPath } = await getConfiguration()
    addImportProviders(framework, provider, baseConfigPath)
    await setEnvironment(`AUTH_${provider}_ID`, "HERE_MUST_CONTAINS_THE_KEY")
    await setEnvironment(`AUTH_${provider}_SECRET`, "HERE_MUST_CONTAINS_THE_KEY")
}