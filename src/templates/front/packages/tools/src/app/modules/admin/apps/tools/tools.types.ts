export enum ToolsProcedureType {
    FUNCTION = 'FUNCTION',
    PROCEDURE = 'PROCEDURE',
    TRIGGER = 'TRIGGER'
}

export interface ToolsKeyValue {
    id: string;
    code: string;
    type: string;
    value: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface ToolsCreateKeyValue {
    id: string;
    code: string;
    type: string;
    value: string;
    isActive: boolean;
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
