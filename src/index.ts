#! /usr/bin/env node

import "dotenv/config"
import { Command } from "commander"
import { init, secret, provider } from "./commands/index.js"
import { name, description, version, configureOutput } from "./utils.js"
import * as y from "yoctocolors"

/**
 * Declare and initialize the program
 */
const program = new Command()

/**
 *
 */
program.name(name).description(description).version(version)

program
    .command("init")
    .description("Setup the project with the selected framework")
    .option("-f, --framework <framework>", "The framework to be used in the project")
    .action(init)

program
    .command("secret")
    .description("Generate a secret key (It is required by Auth.js)")
    .option("-s, --size <size>", "The size of the secret key to be generated")
    .action(secret)

program
    .command("provider")
    .description("Initialize the configuration for the provider selected")
    .option("-p, --provider <provider>", "The provider to be configured")
    .option("-l, --list", "Show all available providers")
    .action(provider)

program
    .showHelpAfterError(y.red("You can execute (auth-init --help) to see the available options"))
    .configureOutput(configureOutput)

/**
 * Parse the command line arguments
 */
program.parseAsync(process.argv).catch(() => {
    console.error(y.red(`[ERROR]: the program was closed`))
    process.exit(1)
})
