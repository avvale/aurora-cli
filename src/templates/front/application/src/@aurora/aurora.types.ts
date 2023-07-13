import { ColumnConfig, ColumnFilterStorage } from '@aurora';
import { BehaviorSubject } from 'rxjs';

export interface Action
{
    id: string;
    isViewAction?: boolean; // if true set variable currentViewAction, this variable is taken into account, to show or not, elements of the view
    beforeRunAction?: (action: Action) => void;
    afterRunAction?: (action: Action) => void;
    spinner?: BehaviorSubject<boolean> | (() => BehaviorSubject<boolean>);
    noCache?: boolean;
    meta?: {
        [key: string]: any;
    };
}

// options to set global and local api environment
export type ApiEnvironment = 'sandbox' | 'live';

export type Appearance = 'legacy' | 'standard' | 'fill' | 'outline';

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

export interface Session
{
    columnFilters?: { [key:string]: ColumnFilterStorage; };
    [key: string]: any;
}

export interface Translatable
{
    availableLangs: string[];
}

export interface ColumnConfigStorage
{
    id: string; // id of grid where apply filter
    hash: string;
    columnsConfig: ColumnConfig[];
}

export interface UserMetaStorage {
    columnsConfigStorage?: { [key:string]: ColumnConfigStorage; };
    [key: string]: any;
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
