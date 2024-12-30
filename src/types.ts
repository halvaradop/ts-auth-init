export interface OptionsCLI {
    size: number
    provider: string
    list: boolean
    framework: string | undefined
}

export interface InternalSpinnerOptions {
    initial: string
    error?: string
    success?: string
    warning?: string
}

export type CreateInternalSpinner = (
    callback: (...args: any) => Promise<void>,
    options: InternalSpinnerOptions,
) => Promise<boolean>

export interface Environment {
    comment?: string
    name: string
    value: string
}

export type SetEnvironment = (variables: Environment | Environment[]) => Promise<boolean>
