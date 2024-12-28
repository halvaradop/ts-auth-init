import path from "path"
import { readFile, writeFile } from "fs/promises"
import { promisify } from "util"
import { exec } from "child_process"
import { createSpinner } from "nanospinner"
import { OutputConfiguration } from "commander"
import { fileURLToPath } from "url"
import { supportedFrameworks } from "./commands/init.js"
import { existsSync } from "fs"
import { CreateInternalSpinner } from "./types.js"
import { DuplicateEnvironmentError } from "./errors.js"

/**
 * Create a promise to execute the command for installing
 * the framework. It is useful to continue with the process
 * without breaking the workflow.
 */
export const execAsync = promisify(exec)

export const { name, description, version } = JSON.parse(
    await readFile(path.join(fileURLToPath(new URL(".", import.meta.url)), "../package.json"), "utf-8"),
)

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
    return path.join(path.resolve(process.cwd()), route)
}

/**
 * Sets up the environment variables used by the providers to ensure the correct
 * connection. These environment variables are mandatory for the proper functioning
 * of the authentication methods offered by Auth.js.
 *
 * @param {string} envName - The name of the environment variable to set.
 * @param {string} value - The value to assign to the environment variable.
 */
export const setEnvironment = (envName: string, value: string) => {
    createInternalSpinner(
        async () => {
            const environmentPath = configPath(".env")
            const existVariable = process.env[envName]
            if (!existVariable) {
                const envContent = await readFile(environmentPath, "utf-8")
                const newLine = envContent.endsWith("\n") ? "" : "\n"
                await writeFile(environmentPath, `${newLine}${envName}=${value}`, {
                    flag: "a",
                    encoding: "utf-8",
                })
            } else {
                throw new DuplicateEnvironmentError()
            }
        },
        {
            initial: `Setting up the environment variable: ${envName}`,
            success: `The environment variable ${envName} was successfully created.`,
            error: `An error occurred while setting the environment variable ${envName}.`,
            warning: `The environment variable ${envName} already exists.`,
        },
    )
}

/**
 * Paints a message with a red color in the output terminal
 * using ANSI escape codes.
 *
 * @param str The message to be printed in red
 * @returns The colored message as a string
 */
export const errorColor = (str: string): string => {
    return `\x1b[31m${str}\x1b[0m`
}

/**
 * Guesses the framework used in the project by analyzing the dependencies in the `package.json` file.
 *
 * @returns {Promise<string | undefined>} - The name of the framework guessed
 */
export const guessFramework = async (): Promise<string | undefined> => {
    if (!existsSync(configPath("package.json"))) return undefined
    const packageJson = JSON.parse(await readFile(configPath("package.json"), "utf-8"))
    if (!packageJson || (packageJson && !packageJson?.dependencies)) return undefined
    return Object.keys(packageJson.dependencies).find((dependency) =>
        supportedFrameworks.has(dependency) ? dependency : undefined,
    )
}

/**
 * The configuration for the output of the program.
 */
export const configureOutput: OutputConfiguration = {
    writeErr: (error) => {
        process.stdout.write(error)
    },
    outputError: (error, write) => {
        write(errorColor(error))
    },
}

export const createInternalSpinner: CreateInternalSpinner = async (callback, { initial, success, error, warning }) => {
    const spinner = createSpinner(initial).start()
    try {
        await callback()
        spinner.success({ text: success })
    } catch (e) {
        if (e instanceof DuplicateEnvironmentError) {
            spinner.warn({ text: warning })
            return
        }
        spinner.error({ text: error })
    }
}
