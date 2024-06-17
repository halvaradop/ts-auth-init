#! /usr/bin/env node

import inquirer from "inquirer"
import { initializeAuth } from "./utils.js"


const framework = await inquirer.prompt({
    name: "framework",
    message: "Select the framework that you will use in your project",
    type: "list",
    choices: [
        "NextJs",
        "SvelteKit",
        "Express"
    ]
})

const configuration = await inquirer.prompt({
    name: "configuration",
    message: "You want to create file configuration ?",
    type: "confirm"
})

const fileName = await inquirer.prompt({
    name: "fileName",
    message: "Name of the configuration file",
    type: "input",
    default: "auth.ts"
})

initializeAuth(framework.framework)