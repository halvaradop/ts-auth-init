import path from "path"
import { promisify } from "util"
import { exec } from "child_process"

/**
 * Create a promise to execute the command for installing
 * the framework. It is useful to continue with the process
 * without breaking the workflow.
 */
export const execAsync = promisify(exec)
export const ROOT = path.resolve(process.cwd())