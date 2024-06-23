#! /usr/bin/env node

import "dotenv/config.js"
import { select, confirm, input } from "@inquirer/prompts"
import { Framework } from "./types.js"
import { initializeAuth } from "./commands/auth.js"


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

initializeAuth(framework, configuration, fileName)