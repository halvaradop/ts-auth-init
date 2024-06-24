import fs from 'fs';
import path from "path"
import { promisify } from "util"
import { exec } from "child_process"
import { createSpinner } from 'nanospinner'

/**
 * Create a promise to execute the command for installing
 * the framework. It is useful to continue with the process
 * without breaking the workflow.
 */
export const execAsync = promisify(exec)
export const ROOT = path.resolve(process.cwd())


/**
 * Constructs a path by joining the ROOT directory with the specified route.
 * 
 * This function takes an optional route (`route`) and returns the full path 
 * by joining the ROOT directory with the given route. If no route is provided, 
 * it returns the ROOT directory.
 * 
 * @param {string} route The optional route to be appended to the ROOT directory.
 * @returns {string} The full path constructed by joining the ROOT directory and the route.
 */
export const configPath = (route: string = ""): string => {
    return path.join(ROOT, route)
}


/**
 * Creates the specified path and writes the content to the file.
 * 
 * This function takes a path (`route`) and content (`content`), creates all necessary directories 
 * in the specified path, and if the last element in the path is a file (with .js or .ts extension), 
 * writes the content to the file.
 * 
 * @param {string} route - The full path where the directories and file should be created.
 * @param {string} content - The content to be written to the file.
 */
export const writeConfig = (route: string, content: string): void => {
    let root = configPath()
    const relative = path.relative(ROOT, route).split("\\")
    relative.forEach(routePath => {
        root = path.join(root, routePath)
        if (!fs.existsSync(root)) {
            if (!routePath.match(".(js|ts)")) {
                if (!fs.existsSync(root)) {
                    fs.mkdirSync(root, { recursive: true })
                }
            } else {
                fs.writeFileSync(route, content, {
                    flag: "a",
                    encoding: "utf-8"
                })
            }
        }
    })
}


/**
 * Sets up the environment variables used throughout the project, initially creating
 * the environment variables. This is mandatory for using auth.js without considering
 * the framework.
 */
export const setEnvironment = async (envName: string, value: string): Promise<void> => {
    const environmentPath = configPath(".env")
    const existVariable = process.env[envName]

    if (!existVariable) {
        const spinner = createSpinner("Setting up the environment variables of the project").start()
        try {
            fs.appendFileSync(environmentPath, `${envName}=${value}\r\n`, {
                flag: "a",
                encoding: "utf-8",                
            })
            spinner.success({ text: `${envName} variable was created` })
        } catch (error) {
            spinner.error({ text: "An error occurred while generating the secret key" })
        }
        return
    }
    createSpinner(`The ${envName} already exists`).warn()
}


/**
 * Adds the import for a provider to the configuration file if it doesn't already exist.
 *
 * @param frameworkPath Path prefix for the provider import (based on framework).
 * @param providerName The name of the provider to import (capitalized).
 * @param baseConfigPath The name of the configuration file.
 */
export const addImportProviders = (frameworkPath: string, providerName: Capitalize<string>, baseConfigPath: string) => {
    const readFile = fs.readFileSync(baseConfigPath, "utf-8")
    const baseImport = `import ${providerName} from "${frameworkPath}/providers/${providerName.toLowerCase()}"`
    if(containsInFile(readFile, baseImport)) return
    
    fs.writeFileSync(baseConfigPath, `${baseImport}\r\n${readFile}` , {
        flag: "w",
        encoding: "utf-8"
    })
}


/**
 * Checks if a string exists within a file line by line.
 *
 * @param {string} fileContent The content of the file to search.
 * @param {string} searchString The string to search for.
 * @returns {boolean} True if the search string exists in a line of the file, false otherwise.
 */
export const containsInFile = (fileContent: string, searchString: string): boolean => {
    return fileContent.split(/\r?\n/).some(line => line.trim() === searchString.trim())
}