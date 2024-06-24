import { rawlist } from "@inquirer/prompts"
import { setEnvironment } from "../utils.js"


export const getProvider = async () => {
    return await rawlist({
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
 * 
 */
export const promptInitProviders = async () => {
    const provider = await getProvider()
    await setEnvironment(`AUTH_${provider}_ID`, "HERE_MUST_CONTAINS_THE_KEY")
    await setEnvironment(`AUTH_${provider}_SECRET`, "HERE_MUST_CONTAINS_THE_KEY")
}