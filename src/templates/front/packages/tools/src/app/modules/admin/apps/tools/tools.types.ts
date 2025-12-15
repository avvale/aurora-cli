export enum ToolsProcedureType {
    FUNCTION = 'FUNCTION',
    PROCEDURE = 'PROCEDURE',
    TRIGGER = 'TRIGGER',
}

export interface ToolsKeyValue {
    id: string;
    key: string;
    type: string;
    value: string;
    isCached: boolean;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateKeyValue {
    id: string;
    key: string;
    type: string;
    value: string;
    isActive: boolean;
    isCached: boolean;
}

export interface ToolsUpdateKeyValueById {
    id: string;
    code?: string;
    type?: string;
    value?: string;
    isActive?: boolean;
}

export interface ToolsUpdateKeyValues {
    id?: string;
    code?: string;
    type?: string;
    value?: string;
    isActive?: boolean;
}

export interface ToolsProcedure {
    id: string;
    name: string;
    type: string;
    version: string;
    isActive: boolean;
    upScript?: string;
    downScript?: string;
    executedAt?: string;
    checkedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateProcedure {
    id: string;
    name: string;
    type: string;
    version: string;
    isActive: boolean;
    upScript?: string;
    downScript?: string;
    executedAt?: string;
    checkedAt?: string;
}

export interface ToolsUpdateProcedureById {
    id: string;
    name?: string;
    type?: string;
    version?: string;
    isActive?: boolean;
    upScript?: string;
    downScript?: string;
    executedAt?: string;
    checkedAt?: string;
}

export interface ToolsUpdateProcedures {
    id?: string;
    name?: string;
    type?: string;
    version?: string;
    isActive?: boolean;
    upScript?: string;
    downScript?: string;
    executedAt?: string;
    checkedAt?: string;
}

export interface ToolsMigration {
    id: string;
    name: string;
    version: string;
    isActive: boolean;
    upScript?: string;
    downScript?: string;
    sort?: number;
    executedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateMigration {
    id: string;
    name: string;
    version: string;
    isActive: boolean;
    upScript?: string;
    downScript?: string;
    sort?: number;
    executedAt?: string;
}

export interface ToolsUpdateMigrationById {
    id: string;
    name?: string;
    version?: string;
    isActive?: boolean;
    upScript?: string;
    downScript?: string;
    sort?: number;
    executedAt?: string;
}

export interface ToolsUpdateMigrations {
    id?: string;
    name?: string;
    version?: string;
    isActive?: boolean;
    upScript?: string;
    downScript?: string;
    sort?: number;
    executedAt?: string;
}

export interface ToolsWebhook {
    id: string;
    rowId: number;
    name: string;
    service: string;
    endpoint: string;
    externalId?: string;
    events?;
    secret?: string;
    meta?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateWebhook {
    id: string;
    rowId: number;
    name: string;
    service: string;
    endpoint: string;
    externalId?: string;
    events?: string[];
    secret?: string;
    meta?: any;
}

export interface ToolsUpdateWebhookById {
    id: string;
    rowId?: number;
    name?: string;
    service?: string;
    endpoint?: string;
    externalId?: string;
    events?;
    secret?: string;
    meta?: any;
}

export interface ToolsUpdateWebhooks {
    id?: string;
    rowId?: number;
    name?: string;
    service?: string;
    endpoint?: string;
    externalId?: string;
    events?: string[];
    secret?: string;
    meta?: any;
}

export interface ToolsWebhookLog {
    id: string;
    rowId: number;
    url: string;
    headerRequest?: any;
    bodyRequest?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateWebhookLog {
    id: string;
    rowId: number;
    url: string;
    headerRequest?: any;
    bodyRequest?: any;
}

export interface ToolsUpdateWebhookLogById {
    id: string;
    rowId?: number;
    url?: string;
    headerRequest?: any;
    bodyRequest?: any;
}

export interface ToolsUpdateWebhookLogs {
    id?: string;
    rowId?: number;
    url?: string;
    headerRequest?: any;
    bodyRequest?: any;
}
