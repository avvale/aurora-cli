export interface CoreLang
{
    id: string;
    name: string;
    image?: string;
    iso6392: string;
    iso6393: string;
    ietf: string;
    customCode?: string;
    dir: CoreLangDir;
    sort?: number;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export enum CoreLangDir
{
    LTR = 'LTR',
    RTL = 'RTL',
}

export enum CoreSearchKeyLang
{
    ID = 'id',
    ISO6392 = 'iso6392',
    ISO6393 = 'iso6393',
    IETF = 'ietf'
}