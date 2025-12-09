export interface EnvironmentsInformation {
    front: EnvironmentInformation;
    back: EnvironmentInformation;
}

export interface EnvironmentInformation {
    name: string;
    version: string;
    environment: string;
}
