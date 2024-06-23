
export const codeExpress = () => `
import { ExpressAuth } from "@auth/express"
import express from "express"

const app = express()

app.set("trust proxy", true)
app.use("/auth/*", ExpressAuth({ providers: [] }))
`