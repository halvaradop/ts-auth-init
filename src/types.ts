
export type Framework = "NextJs" | "SvelteKit" | "Express" 

export interface FlagOptions {
    secret: boolean
}

export interface PathFile {
    path: string
    content: string
}