import { OptionsCLI } from "@/types.js"
import { guessFramework, setEnvironment } from "../utils.js"
import { rawlist, select } from "@inquirer/prompts"
import { supportedFrameworks } from "./init.js"

const supportedProviders = [
    "GitHub",
    "Google",
    "Twitter",
    "Apple",
    "Discord",
    "Auth0",
    "Facebook",
    "Keycloak",
    "42-school",
    "Asgardeo",
    "Atlassian",
    "Authentik",
    "Azure-ad-b2c",
    "Azure-ad",
    "Azure-devops",
    "Battlenet",
    "Beyondidentity",
    "Box",
    "Boxyhq-saml",
    "Bungie",
    "Click-up",
    "Cognito",
    "Coinbase",
    "Descope",
    "Dribbble",
    "Dropbox",
    "Duende-identityserver-6",
    "Eveonline",
    "Faceit",
    "Foursquare",
    "Freshbooks",
    "Fusionauth",
    "GitLab",
    "Hubspot",
    "Identity-server4",
    "Instagram",
    "Kakao",
    "Kinde",
    "Line",
    "LinkedIn",
    "Mailchimp",
    "Mailru",
    "Mastodon",
    "Mattermost",
    "Medium",
    "Naver",
    "Netlify",
    "Notion",
    "Okta",
    "Onelogin",
    "Osso",
    "Osu",
    "Passage",
    "Patreon",
    "Pinterest",
    "Pipedrive",
    "Reddit",
    "Salesforce",
    "Slack",
    "Spotify",
    "Strava",
    "Tiktok",
    "Todoist",
    "Trakt",
    "Twitch",
    "United-effects",
    "Vk",
    "Webex",
    "Wikimedia",
    "Wordpress",
    "Workos",
    "Yandex",
    "Zitadel",
    "Zoho",
    "Zoom",
]

export const provider = async ({ provider, list }: OptionsCLI) => {
    if (!provider || (provider && !supportedProviders.some((supported) => supported.toLowerCase() === provider))) {
        const selectedProvider = await rawlist<string>({
            message: "Select the provider to be configured",
            choices: list ? supportedProviders : supportedProviders.splice(0, 10),
        })
        provider = selectedProvider
    }
    await setEnvironment(`AUTH_${provider.toUpperCase()}_ID`, "YOUR_PROVIDER_ID")
    await setEnvironment(`AUTH_${provider.toUpperCase()}_SECRET`, "YOUR_PROVIDER_SECRET")
    console.log(
        `\nThe configuration for ${provider} provider has been initialized`,
        `\nFor more information, visit https://authjs.dev/getting-started/providers/${provider.toLowerCase()}`,
    )
    const framework = await guessFramework()
    let path = supportedFrameworks.get(framework!)
    if (!framework) {
        const selectedFramework = await select<string>({
            message: "Select the framework that you will use in your project",
            choices: [...supportedFrameworks.keys()],
        })
        path = supportedFrameworks.get(selectedFramework)
    }
    console.log(
        `\nCopy the next line in your configuration file`,
        `\nimport ${provider.at(0)?.toUpperCase()}${provider.substring(1)} from "${path}/providers/${provider.toLowerCase()}"`,
    )
}
