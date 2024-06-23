#! /usr/bin/env node

import "dotenv/config.js"
import { select, confirm, input } from "@inquirer/prompts"
import { FlagOptions, Framework } from "./types.js"
import { initializeAuth } from "./commands/auth.js"
import { Command } from "commander"
import { setEnvironment } from "./commands/environment.js"

const framework = await select<Framework>({
    message: "Select the framework that you will use in your project",
    choices: [
        { name: "NextJs", value: "NextJs" },
        { name: "SvelteKit", value: "SvelteKit" },
        { name: "Express", value: "Express" },
    ]
})

const configuration = await confirm({
    message: "You want to create file configuration ?",
})

const fileName = await input({
    message: "Name of the configuration file",
    default: "auth.ts"
})

const program = new Command()

program
    .name("auth-init")
    .description("Initializer a project with Auth.js")
    .version("0.0.1")

program
    .option("-s, --secret", "Generate the secret key")
    .action(async (flags: FlagOptions) => {
        if(flags.secret) {
            await setEnvironment()
        }
    })

program.parseAsync(process.argv)
initializeAuth(framework, configuration, fileName)