import path from "path"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { promisify } from "util"
import { exec } from "child_process"
import { createSpinner } from "nanospinner"
import { OutputConfiguration } from "commander"
import { fileURLToPath } from "url"
import { supportedFrameworks } from "./commands/init.js"
import { CreateInternalSpinner, Environment, SetEnvironment } from "./types.js"
import { DuplicateEnvironmentError } from "./errors.js"
import * as y from "yoctocolors"

/**
 * Create a promise to execute the command for installing
 * the framework. It is useful to continue with the process
 * without breaking the workflow.
 */
export const execAsync = promisify(exec)

export const { name, description, version } = JSON.parse(
    readFileSync(path.join(fileURLToPath(new URL(".", import.meta.url)), "../package.json"), "utf-8"),
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
 * Sets up the environment variables required by Auth.js to ensure the correct connection
 * and work with its configuration.
 *
 */
export const setEnvironment: SetEnvironment = async (variables) => {
    const environments: Environment[] = variables instanceof Array ? variables : [variables]
    const filters = await Promise.all(
        environments.map(async ({ name, value, comment = "" }) => {
            return await createInternalSpinner(
                async () => {
                    const environmentPath = configPath(".env")
                    const existVariable = process.env[name]
                    if (!existVariable) {
                        const envContent = readFileSync(environmentPath, "utf-8")
                        const newLine = envContent.endsWith("\n") ? "" : "\n"
                        const includesComment = comment ? `${newLine}\n${comment}\n` : newLine
                        writeFileSync(environmentPath, `${includesComment}${name}=${value}`, {
                            flag: "a",
                            encoding: "utf-8",
                        })
                    } else {
                        throw new DuplicateEnvironmentError()
                    }
                },
                {
                    initial: `Setting up the environment variable: ${name}`,
                    success: `The environment variable ${name} was successfully created.`,
                    error: `An error occurred while setting the environment variable ${name}.`,
                    warning: `The environment variable ${name} already exists.`,
                },
            )
        }),
    )
    return filters.some((filter) => !filter)
}

/**
 * Guesses the framework used in the project by analyzing the dependencies in the `package.json` file.
 *
 * @returns {Promise<string | undefined>} - The name of the framework guessed
 */
export const guessFramework = async (): Promise<string | undefined> => {
    if (!existsSync(configPath("package.json"))) return undefined
    const packageJson = JSON.parse(readFileSync(configPath("package.json"), "utf-8"))
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
        write(y.red(error))
    },
}

/**
 * Creates a spinner that runs while a process is executing and stops when the process finishes.
 * It accepts multiple messages to be displayed during different stages of the process.
 */
export const createInternalSpinner: CreateInternalSpinner = async (
    callback,
    { initial, success = "", error = "", warning = "" },
) => {
    const spinner = createSpinner(initial).start()
    try {
        await callback()
        spinner.success({ text: y.green(success) })
        return true
    } catch (e) {
        if (e instanceof DuplicateEnvironmentError) {
            spinner.warn({ text: y.yellow(warning) })
        } else {
            spinner.error({ text: y.red(error) })
        }
        return false
    }
}

/**
 * Gets what is the package manager used at the time to execute the command.
 *
 * @source https://github.com/vercel/next.js/blob/canary/packages/create-next-app/helpers/get-pkg-manager.ts
 * @returns {string} The package manager used in the project
 * @example
 * ```zsh
 * # npm
 * npx \@halvaradop/auth-init init
 *
 * # pnpm
 * pnpm dlx \@halvaradop/auth-init init
 * ```
 */
export const getPackageManager = (): string => {
    const userAgent = process.env.npm_config_user_agent || ""
    if (userAgent.startsWith("pnpm")) {
        return "pnpm"
    }
    if (userAgent.startsWith("bun")) {
        return "bun"
    }
    if (userAgent.startsWith("yarn")) {
        return "yarn"
    }
    return "npm"
}
