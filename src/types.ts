
export type Framework = "NextJs" | "SvelteKit" | "Express" 

export interface FlagOptions {
    secret: boolean,
    providers: boolean
}

export interface PathFile {
    path: string
    content: string
}

export type ArgsFunction = (...args: any) => void