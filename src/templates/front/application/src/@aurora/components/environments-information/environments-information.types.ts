export interface EnvironmentsInformation
{
    app: EnvironmentInformation;
    server: EnvironmentInformation;
}

export interface EnvironmentInformation
{
    name: string;
    version: string;
}