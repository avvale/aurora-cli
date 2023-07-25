export interface SearchEngineCollection {
    id: string;
    name: string;
    documentsNumber?: number;
    defaultSortingField?: string;
    numMemoryShards?: number;
    timestampCreatedAt?: number;
    isEnableNestedFields: boolean;
    fields?: SearchEngineField[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface SearchEngineCreateCollection {
    id: string;
    name: string;
    documentsNumber?: number;
    defaultSortingField?: string;
    numMemoryShards?: number;
    timestampCreatedAt?: number;
    isEnableNestedFields: boolean;
    fields?: SearchEngineField[];
}

export interface SearchEngineUpdateCollectionById {
    id: string;
    name?: string;
    documentsNumber?: number;
    defaultSortingField?: string;
    numMemoryShards?: number;
    timestampCreatedAt?: number;
    isEnableNestedFields?: boolean;
    fields?: SearchEngineField[];
}

export interface SearchEngineUpdateCollections {
    id?: string;
    name?: string;
    documentsNumber?: number;
    defaultSortingField?: string;
    numMemoryShards?: number;
    timestampCreatedAt?: number;
    isEnableNestedFields?: boolean;
    fields?: SearchEngineField[];
}

export interface SearchEngineField {
    id: string;
    collectionId: string;
    name: string;
    type: string;
    isNullable: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface SearchEngineCreateField {
    id: string;
    collectionId: string;
    name: string;
    type: string;
    isNullable: boolean;
}

export interface SearchEngineUpdateFieldById {
    id: string;
    collectionId?: string;
    name?: string;
    type?: string;
    isNullable?: boolean;
}

export interface SearchEngineUpdateFields {
    id?: string;
    collectionId?: string;
    name?: string;
    type?: string;
    isNullable?: boolean;
}
