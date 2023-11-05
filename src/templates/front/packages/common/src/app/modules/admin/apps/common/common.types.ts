export enum CommonAdministrativeArea {
    ADMINISTRATIVE_AREA_LEVEL_1 = 'ADMINISTRATIVE_AREA_LEVEL_1',
    ADMINISTRATIVE_AREA_LEVEL_2 = 'ADMINISTRATIVE_AREA_LEVEL_2',
    ADMINISTRATIVE_AREA_LEVEL_3 = 'ADMINISTRATIVE_AREA_LEVEL_3'
}

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
    administrativeAreas?: string[];
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: CommonCountryMapType;
    availableLangs?: string[];
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
    mapType: CommonCountryMapType;
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
    mapType?: CommonCountryMapType;
    availableLangs?: any;
    countryId?: string;
    langId?: string;
    name?: string;
    slug?: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel3?: string;
}

export enum CommonCountryMapType {
    ROADMAP = 'ROADMAP',
    SATELLITE = 'SATELLITE',
    HYBRID = 'HYBRID',
    TERRAIN = 'TERRAIN'
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
    mapType?: CommonCountryMapType;
    availableLangs?: any;
    countryId?: string;
    langId?: string;
    name?: string;
    slug?: string;
    administrativeAreaLevel1?: string;
    administrativeAreaLevel2?: string;
    administrativeAreaLevel3?: string;
}

export interface CommonAdministrativeAreaLevel1 {
    id: string;
    countryId: string;
    code: string;
    customCode?: string;
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface CommonCreateAdministrativeAreaLevel1 {
    id: string;
    countryId: string;
    code: string;
    customCode?: string;
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
}

export interface CommonUpdateAdministrativeAreaLevel1ById {
    id: string;
    countryId?: string;
    code?: string;
    customCode?: string;
    name?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
}

export interface CommonUpdateAdministrativeAreasLevel1 {
    id?: string;
    countryId?: string;
    code?: string;
    customCode?: string;
    name?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
}

export interface CommonAdministrativeAreaLevel2 {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    code: string;
    customCode?: string;
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface CommonCreateAdministrativeAreaLevel2 {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    code: string;
    customCode?: string;
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
}

export interface CommonUpdateAdministrativeAreaLevel2ById {
    id: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    code?: string;
    customCode?: string;
    name?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
}

export interface CommonUpdateAdministrativeAreasLevel2 {
    id?: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    code?: string;
    customCode?: string;
    name?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
}

export interface CommonAdministrativeAreaLevel3 {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel2Id: string;
    code: string;
    customCode?: string;
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface CommonCreateAdministrativeAreaLevel3 {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel2Id: string;
    code: string;
    customCode?: string;
    name: string;
    slug: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType: string;
}

export interface CommonUpdateAdministrativeAreaLevel3ById {
    id: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel2Id?: string;
    code?: string;
    customCode?: string;
    name?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
}

export interface CommonUpdateAdministrativeAreasLevel3 {
    id?: string;
    countryId?: string;
    administrativeAreaLevel1Id?: string;
    administrativeAreaLevel2Id?: string;
    code?: string;
    customCode?: string;
    name?: string;
    slug?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    mapType?: string;
}

export interface CommonResource {
    id: string;
    code?: string;
    name: string;
    isActive: boolean;
    hasAttachments: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface CommonCreateResource {
    id: string;
    code?: string;
    name: string;
    isActive: boolean;
    hasAttachments: boolean;
}

export interface CommonUpdateResourceById {
    id: string;
    code?: string;
    name?: string;
    isActive?: boolean;
    hasAttachments?: boolean;
}

export interface CommonUpdateResources {
    id?: string;
    code?: string;
    name?: string;
    isActive?: boolean;
    hasAttachments?: boolean;
}

export interface CommonAttachmentFamily {
    id: string;
    resourceId: string;
    name: string;
    width?: number;
    height?: number;
    fitType?: string;
    quality?: number;
    sizes?: any;
    format?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface CommonCreateAttachmentFamily {
    id: string;
    resources?: string[];
    name: string;
    width?: number;
    height?: number;
    fitType?: string;
    quality?: number;
    sizes?: any;
    format?: string;
}

export interface CommonUpdateAttachmentFamilyById {
    id: string;
    resources?: CommonResource[];
    name?: string;
    width?: number;
    height?: number;
    fitType?: string;
    quality?: number;
    sizes?: any;
    format?: string;
}

export interface CommonUpdateAttachmentFamilies {
    id?: string;
    resources?: string[];
    name?: string;
    width?: number;
    height?: number;
    fitType?: string;
    quality?: number;
    sizes?: any;
    format?: string;
}
