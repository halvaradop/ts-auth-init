export interface OptionsCLI {
    size: number
    provider: string
    list: boolean
    framework: string | undefined
}

interface InternalSpinnerOptions {
    initial: string
    error?: string
    success?: string
    warning?: string
}

export type CreateInternalSpinner = (callback: (...args: any) => Promise<void>, options: InternalSpinnerOptions) => void
