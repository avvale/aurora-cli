export type Appearance = 'legacy' | 'standard' | 'fill' | 'outline';

// options to set global and local api environment
export type ApiEnvironment = 'sandbox' | 'live';

export interface BoundedContext
{
    id: string;
    name: string;
    root?: string;
    isActive?: boolean;
    sort?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Credentials
{
    accessToken: string;
    refreshToken: string;
}

export interface Config
{
    readonly graphQLUri: string;
    readonly restUrl: string;
    readonly siteUrl: string;
    readonly apiEnvironment: ApiEnvironment;
    readonly langs: string[];
    readonly fallbackLang: string;
    readonly baseLang: string;
    readonly dateFormat: string;
    readonly fieldAppearance: FieldAppearance;
    readonly tablesPageSize: number;
    readonly tablesPageSizeOptions: number[];
    readonly initialUrl: string;
    readonly data: Property[];
}

export interface Environment
{
    production: boolean;
    debug: boolean;
    api: {
        graphql: string;
        rest: string;
    };
    lang: {
        base: string;
        fallback: string;
        langs: string[];
    };
    data?: {
        key: string;
        value: string;
    }[];
    // config: Config;
    // theme: Theme;
}

export interface RouteData
{
    permission: string;
    [key:string]: any;
}









// TODO, tipos por revisar

export enum FieldAppearance
{
    FILL     = 'fill',
    LEGACY   = 'legacy',
    STANDARD = 'standard',
    OUTLINE  = 'outline',
}

export interface Property
{
    key: string;
    value: string;
}

export interface Theme
{
    colorTheme: string; // TODO comprobar
    /*
    favicon: string;
    loginDesktopLogo: string;
    loginFormLogo: string;
    loginMobileLogo: string;
    logoIcon: string;
    logoText: string;
    productLogo: string;
    splashLogo: string;
    splashSpinnerColor: string;
    splashWidthLogoSize: number;
    title: string;
    welcomeText: string; */
}

export interface Translatable
{
    dataLang: string[];
}

