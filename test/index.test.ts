import { describe, test, expect } from "vitest"
import { setAuthConfigEnvironment } from "../src/commands/secret.js"

describe("setAuthConfigEnvironment", () => {
	test("should write the environment variables correctly", async () => {
		await setAuthConfigEnvironment()
	})
})
