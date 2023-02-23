/**************
 * sideEffect *
 **************/
export interface AuditingSideEffect {
    id: string;
    modelPath: string;
    modelName: string;
    operationId?: string;
    operationSort?: number;
    accountId: string;
    email: string;
    event: string;
    auditableId: string;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    method: string;
    baseUrl?: string;
    params?: any;
    query?: any;
    body?: any;
    userAgent?: string;
    tags?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AuditingCreateSideEffect {
    id: string;
    modelPath: string;
    modelName: string;
    operationId?: string;
    operationSort?: number;
    accountId: string;
    email: string;
    event: string;
    auditableId: string;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    method: string;
    baseUrl?: string;
    params?: any;
    query?: any;
    body?: any;
    userAgent?: string;
    tags?: any;
}

export interface AuditingUpdateSideEffectById {
    id: string;
    modelPath?: string;
    modelName?: string;
    operationId?: string;
    operationSort?: number;
    accountId?: string;
    email?: string;
    event?: string;
    auditableId?: string;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    method?: string;
    baseUrl?: string;
    params?: any;
    query?: any;
    body?: any;
    userAgent?: string;
    tags?: any;
}

export interface AuditingUpdateSideEffects {
    id?: string;
    modelPath?: string;
    modelName?: string;
    operationId?: string;
    operationSort?: number;
    accountId?: string;
    email?: string;
    event?: string;
    auditableId?: string;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    method?: string;
    baseUrl?: string;
    params?: any;
    query?: any;
    body?: any;
    userAgent?: string;
    tags?: any;
}

export enum AuditingSideEffectEvent {
    CREATED = 'CREATED',
    BULK_CREATED = 'BULK_CREATED',
    UPDATED = 'UPDATED',
    BULK_UPDATED = 'BULK_UPDATED',
    DELETED = 'DELETED',
    BULK_DELETED = 'BULK_DELETED',
    RESTORED = 'RESTORED',
    BULK_RESTORED = 'BULK_RESTORED',
    UPSERTED = 'UPSERTED'
}

/*********************
 * httpCommunication *
 *********************/
export interface AuditingHttpCommunication {
    id: string;
    status?: number;
    httpRequest?: any;
    httpRequestRejected?: any;
    httpResponse?: any;
    httpResponseRejected?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AuditingCreateHttpCommunication {
    id: string;
    status?: number;
    httpRequest?: any;
    httpRequestRejected?: any;
    httpResponse?: any;
    httpResponseRejected?: any;
}

export interface AuditingUpdateHttpCommunicationById {
    id: string;
    status?: number;
    httpRequest?: any;
    httpRequestRejected?: any;
    httpResponse?: any;
    httpResponseRejected?: any;
}

export interface AuditingUpdateHttpCommunications {
    id?: string;
    status?: number;
    httpRequest?: any;
    httpRequestRejected?: any;
    httpResponse?: any;
    httpResponseRejected?: any;
}
