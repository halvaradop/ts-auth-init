import { codeExpressBase } from "../templates/express.js"
import { getCodeNextBase, getCodeNextMiddleware, getCodeNextHandler } from "../templates/next.js"
import { codeSvelteKitBase, codeSvelteKitHandler } from "../templates/svelte.js"
import { Framework, PathFile } from "../types.js"

/**
 * Generates code configuration based on the chosen framework and configuration file name.
 *
 * This function takes the selected framework and the base configuration file name as input,
 * and returns an array of objects containing paths and content specific to the chosen framework.
 * The base configuration file name is used dynamically within the generated code for relevant paths.
 *
 * @param {Framework} framework The framework to get the code configuration for.
 * @param {string} baseConfigPath The name of the configuration file.
 * @returns The array of path and content objects for the specified framework.
 */
export const getCodeByFramework = (framework: Framework, baseConfigPath: string) => {
	const frameworkCode: Record<Framework, PathFile[]> = {
		NextJs: [
			{
				path: baseConfigPath,
				content: getCodeNextBase,
			},
			{
				path: "app/api/auth/[...nextauth]/route.ts",
				content: getCodeNextHandler(baseConfigPath),
			},
			{
				path: "middleware.ts",
				content: getCodeNextMiddleware(baseConfigPath),
			},
		],
		SvelteKit: [
			{
				path: baseConfigPath,
				content: codeSvelteKitBase,
			},
			{
				path: "src/hooks.server.ts",
				content: codeSvelteKitHandler,
			},
		],
		Express: [
			{
				path: baseConfigPath,
				content: codeExpressBase,
			},
		],
	}
	return frameworkCode[framework]
}

/**
 * The command to be executed to install the dependencides of a framework
 */
export const frameworkInstall: Record<Framework, string> = {
	NextJs: "npm i next-auth@beta",
	SvelteKit: "npm i @auth/sveltekit",
	Express: "npm i @auth/express",
}
