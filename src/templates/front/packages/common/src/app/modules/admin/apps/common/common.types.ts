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

export interface CommonCountry {
    id: string;
    iso3166Alpha2: string;
    iso3166Alpha3: string;
    iso3166Numeric: string;
    customCode?: string;
    prefix?: string;
    image?: string;
    sort?: number;
    administrativeAreas?: any;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
    availableLangs?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    countryId: string;
    langId: string;
    name: string;
    slug: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel3?: string;
}

export interface CommonCreateCountry {
    id: string;
    iso3166Alpha2: string;
    iso3166Alpha3: string;
    iso3166Numeric: string;
    customCode?: string;
    prefix?: string;
    image?: string;
    sort?: number;
    administrativeAreas?: any;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
    availableLangs?: any;
    countryId: string;
    langId: string;
    name: string;
    slug: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel3?: string;
}

export interface CommonUpdateCountryById {
    id: string;
    iso3166Alpha2?: string;
    iso3166Alpha3?: string;
    iso3166Numeric?: string;
    customCode?: string;
    prefix?: string;
    image?: string;
    sort?: number;
    administrativeAreas?: any;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
    availableLangs?: any;
    countryId?: string;
    langId?: string;
    name?: string;
    slug?: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel3?: string;
}

export interface CommonUpdateCountries {
    id?: string;
    iso3166Alpha2?: string;
    iso3166Alpha3?: string;
    iso3166Numeric?: string;
    customCode?: string;
    prefix?: string;
    image?: string;
    sort?: number;
    administrativeAreas?: any;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
    availableLangs?: any;
    countryId?: string;
    langId?: string;
    name?: string;
    slug?: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel3?: string;
}
