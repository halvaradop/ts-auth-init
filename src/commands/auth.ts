import fs from "fs"
import path from "path"
import { createSpinner } from "nanospinner"
import { execAsync, ROOT } from "../utils.js"
import { Framework } from "../types.js"
import { frameworkCode, frameworkInstall } from "./frameworks.js"



/**
 * Initialize the set of configuration for a framework, like:
 *  - NextJs
 *  - SvelteKit
 *  - Express
 * 
 * @param framework the configuration of the framework
 */
export const initializeAuth = async (framework: Framework, create: boolean, fileName: string) => {
    const authConfigPath = path.join(ROOT, fileName)
    const code = frameworkCode[framework]
    const install = frameworkInstall[framework]
    const spinner = createSpinner(`Installing ${framework} package`).start()
    
    await execAsync(install)
    spinner.success({
        text: "The package was installed successfully"
    })

    if(create) {
        if(!fs.existsSync(authConfigPath)) {
            fs.writeFileSync(authConfigPath, code, {
                flag: "w",
                encoding: "utf-8"
            })
        } else {
            return "The auth.file already exists"
        }
    }
}