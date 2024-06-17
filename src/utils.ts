import fs from "fs"
import path from "path"
import { promisify } from "util"
import { Framework } from "./types.js"
import { exec } from "child_process"
import { createSpinner } from "nanospinner"
import { codeExpress, codeNextJs, codeSvelteKit } from "./init.js"


const execAsync = promisify(exec)
export const ROOT = path.resolve(process.cwd())


/**
 * The code to be printed in the files at the moment
 * to create the auth.ts configuration file
 */
export const frameworkCode: Record<Framework, string> = {
    "NextJs": codeNextJs,
    "SvelteKit": codeSvelteKit,
    "Express": codeExpress
}

/**
 * The command to be executed to install the dependencides of a framework
 */
export const frameworkInstall: Record<Framework, string> = {
    "NextJs": "npm i next-auth@beta",
    "SvelteKit": "npm i @auth/sveltekit",
    "Express": "npm i @auth/express"
}

/**
 * Initialize the set of configuration for a framework, like:
 *  - NextJs
 *  - SvelteKit
 *  - Express
 * 
 * @param framework the configuration of the framework
 */
export const initializeAuth = async (framework: Framework) => {
    const authConfigPath = path.join(ROOT, "auth.ts")
    const code = frameworkCode[framework]
    const install = frameworkInstall[framework]
    const spinner = createSpinner(`Installing ${framework} package.`).start()
    
    await executeComamnd(install)
    spinner.success({
        text: "The package was installed success"
    })

    if(!fs.existsSync("auth.ts")) {
        fs.writeFileSync(authConfigPath, code, {
            flag: "w",
            encoding: "utf-8"
        })
    } else {
        console.log("The auth.file ready exist.")
    }
}


/**
 * Create a promise to execute the command for installing
 * the framework. It is useful to continue with the process
 * without breaking the workflow.
 * 
 * @param command the command to be executed
 * @returns a promise of the process executed
 */
export const executeComamnd = async (command: string) => {
    return new Promise(resolve => {
        resolve(execAsync(command))
    })
}