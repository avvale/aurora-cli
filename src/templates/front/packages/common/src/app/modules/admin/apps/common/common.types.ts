export interface CommonLang {
    id: string;
    name: string;
    image?: string;
    iso6392: string;
    iso6393: string;
    ietf: string;
    customCode?: string;
    dir: string;
    sort?: number;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface CommonCreateLang {
    id: string;
    name: string;
    image?: string;
    iso6392: string;
    iso6393: string;
    ietf: string;
    customCode?: string;
    dir: string;
    sort?: number;
    isActive: boolean;
}

export interface CommonUpdateLangById {
    id: string;
    name?: string;
    image?: string;
    iso6392?: string;
    iso6393?: string;
    ietf?: string;
    customCode?: string;
    dir?: string;
    sort?: number;
    isActive?: boolean;
}

export interface CommonUpdateLangs {
    id?: string;
    name?: string;
    image?: string;
    iso6392?: string;
    iso6393?: string;
    ietf?: string;
    customCode?: string;
    dir?: string;
    sort?: number;
    isActive?: boolean;
}
