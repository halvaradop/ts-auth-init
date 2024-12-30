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

/**
 * Initialize the configuration for a provider supported by Auth.js
 *
 * @param {OptionsCLI} options - The options to be used in the provider command
 */
export const provider = async ({ provider, list }: OptionsCLI) => {
    if (!provider || (provider && !supportedProviders.some((supported) => supported.toLowerCase() === provider))) {
        provider = await rawlist<string>({
            message: "Select the provider to be configured",
            choices: list ? supportedProviders : supportedProviders.splice(0, 10),
        })
    }
    const writeEnvironments = await setEnvironment([
        {
            comment: `# ENVIRONMENT VARIABLES FOR CLIENT-ID AND CLIENT-SECRET WHEN USING ${provider.toUpperCase()} OAUTH PROVIDER`,
            name: `AUTH_${provider.toUpperCase()}_ID`,
            value: "YOUR_PROVIDER_ID",
        },
        {
            name: `AUTH_${provider.toUpperCase()}_SECRET`,
            value: "YOUR_PROVIDER_SECRET",
        },
    ])
    if (writeEnvironments) return
    console.log(
        `\nThe configuration for ${provider} provider has been initialized`,
        `\nFor more information, visit https://authjs.dev/getting-started/providers/${provider.toLowerCase()}\n`,
    )
    let framework = await guessFramework()
    if (!framework) {
        framework = await select<string>({
            message: "Select the framework that you will use in your project",
            choices: [...supportedFrameworks.keys()],
        })
    }
    console.log(
        `\nCopy the next line in your configuration file`,
        `\nimport ${provider.at(0)?.toUpperCase()}${provider.substring(1)} from "${supportedFrameworks.get(framework)}/providers/${provider.toLowerCase()}"`,
    )
}
