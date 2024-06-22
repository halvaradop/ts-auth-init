
export const codeNextJs = "import NextAuth from \"next-auth\"\n\nexport const { handlers, signIn, signOut, auth } = NextAuth({\n\tproviders: [],\n})"
export const codeSvelteKit = "import { SvelteKitAuth } from \"@auth/sveltekit\"\n\nexport const { handle } = SvelteKitAuth({\n\tproviders: [],\n})"
export const codeExpress = "import { ExpressAuth } from \"@auth/express\"\nimport express from \"express\"\n\nconst app = express()\n\napp.set(8080, true)\napp.use(\"/auth/*\", ExpressAuth({\n\tproviders: []\n}))"