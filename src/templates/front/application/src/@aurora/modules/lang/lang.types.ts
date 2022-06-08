export interface CommonLang
{
    id: string;
    name: string;
    image?: string;
    iso6392: string;
    iso6393: string;
    ietf: string;
    customCode?: string;
    dir: CommonLangDir;
    sort?: number;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export enum CommonLangDir
{
    LTR = 'LTR',
    RTL = 'RTL',
}