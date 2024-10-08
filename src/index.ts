#! /usr/bin/env node

import "dotenv/config"
import { FlagOptions } from "./types.js"
import { Command } from "commander"
import { setAuthConfigEnvironment } from "./commands/secret.js"
import { promptInitProviders } from "./prompts/import-provider.js"
import { promptInitConfig } from "./prompts/init.js"
import { errorColor } from "./utils.js"

/**
 * Declare and initialize the program
 */
const program = new Command()

/**
 *
 */
program.name("auth-init").description("Initializes a new project with Auth.js configuration").version("0.0.3")

/**
 * Configuration of CLI options and arguments
 */
program
	.option("-s, --secret", "Generate a secret key for your project (recommended)")
	.option("-p, --providers", "Select a provider to initialize")
	.option("-i, --init", "Run the interactive project setup process", true)
	.action(async (flags: FlagOptions) => {
		if (flags.secret) {
			return await setAuthConfigEnvironment()
		}
		if (flags.providers) {
			return await promptInitProviders()
		}
		if (flags.init) {
			return await promptInitConfig()
		}
	})
	.showHelpAfterError(errorColor("You can execute (auth-init --help) to see the available options"))
	.configureOutput({
		writeErr: (error) => {
			process.stdout.write(errorColor(`[ERROR]: ${error}`))
		},
		outputError: (error, write) => {
			write(errorColor(error))
		},
	})

/**
 * Parse the command line arguments
 */
await program.parseAsync(process.argv).catch(() => {
	console.error(errorColor(`[ERROR]: the program was closed`))
	process.exit(1)
})
