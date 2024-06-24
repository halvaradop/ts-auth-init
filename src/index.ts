#! /usr/bin/env node

import "dotenv/config.js"
import { FlagOptions } from "./types.js"
import { Command } from "commander"
import { setAuthConfigEnvironment } from "./commands/environment.js"
import { promptInitProviders } from "./prompts/providers.js"
import { promptInitConfig } from "./prompts/init.js"


/**
 * Declare and initialize the program
 */
const program = new Command()
export const { framework, baseConfigPath } = await promptInitConfig()

/**
 * 
 */
program
    .name("auth-init")
    .description("Initializer a project with Auth.js")
    .version("0.0.2")

/**
 * Configuration of CLI options and arguments
 */
program
    .option("-s, --secret", "Generate the secret key")
    .option("-p, --providers", "Select the provider to be initialized")
    .action(async (flags: FlagOptions) => {
        if(flags.secret) {
            await setAuthConfigEnvironment()
        }
        if(flags.providers) {
            await promptInitProviders(framework, baseConfigPath)
        }
    })

/**
* Parse the command line arguments
*/
program.parseAsync(process.argv)
