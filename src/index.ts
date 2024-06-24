#! /usr/bin/env node

import "dotenv/config.js"
import { FlagOptions } from "./types.js"
import { Command } from "commander"
import { setEnvironment } from "./commands/environment.js"
import { promptInitConfig } from "./prompts/init.js"


/**
 * Declare and initialize the program
 */
const program = new Command()

/**
 * 
 */
program
    .name("auth-init")
    .description("Initializer a project with Auth.js")
    .version("0.0.1")

/**
 * Configuration of CLI options and arguments
 */
program
    .option("-s, --secret", "Generate the secret key")
    .action(async (flags: FlagOptions) => {
        if(flags.secret) {
            await setEnvironment()
        }
    })

/**
* Parse the command line arguments
*/
program.parseAsync(process.argv)
promptInitConfig()