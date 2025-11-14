/* eslint-disable key-spacing */
import {
    AuditingCreatedSideEffectEvent,
    AuditingDeletedSideEffectEvent,
    AuditingUpdatedSideEffectEvent,
} from '@app/auditing/side-effect';
import {
    AuditingSideEffectAccountId,
    AuditingSideEffectAuditableId,
    AuditingSideEffectBaseUrl,
    AuditingSideEffectBody,
    AuditingSideEffectCreatedAt,
    AuditingSideEffectDeletedAt,
    AuditingSideEffectEmail,
    AuditingSideEffectEvent,
    AuditingSideEffectId,
    AuditingSideEffectIp,
    AuditingSideEffectIsRollback,
    AuditingSideEffectMethod,
    AuditingSideEffectModelName,
    AuditingSideEffectModelPath,
    AuditingSideEffectNewValue,
    AuditingSideEffectOldValue,
    AuditingSideEffectOperationId,
    AuditingSideEffectOperationSort,
    AuditingSideEffectParams,
    AuditingSideEffectQuery,
    AuditingSideEffectRollbackSideEffectId,
    AuditingSideEffectRowId,
    AuditingSideEffectTags,
    AuditingSideEffectUpdatedAt,
    AuditingSideEffectUserAgent,
} from '@app/auditing/side-effect/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingSideEffect extends AggregateRoot {
    id: AuditingSideEffectId;
    rowId: AuditingSideEffectRowId;
    tags: AuditingSideEffectTags;
    modelPath: AuditingSideEffectModelPath;
    modelName: AuditingSideEffectModelName;
    operationId: AuditingSideEffectOperationId;
    operationSort: AuditingSideEffectOperationSort;
    accountId: AuditingSideEffectAccountId;
    email: AuditingSideEffectEmail;
    event: AuditingSideEffectEvent;
    auditableId: AuditingSideEffectAuditableId;
    oldValue: AuditingSideEffectOldValue;
    newValue: AuditingSideEffectNewValue;
    ip: AuditingSideEffectIp;
    method: AuditingSideEffectMethod;
    baseUrl: AuditingSideEffectBaseUrl;
    params: AuditingSideEffectParams;
    query: AuditingSideEffectQuery;
    body: AuditingSideEffectBody;
    userAgent: AuditingSideEffectUserAgent;
    isRollback: AuditingSideEffectIsRollback;
    rollbackSideEffectId: AuditingSideEffectRollbackSideEffectId;
    createdAt: AuditingSideEffectCreatedAt;
    updatedAt: AuditingSideEffectUpdatedAt;
    deletedAt: AuditingSideEffectDeletedAt;

    constructor(
        id: AuditingSideEffectId,
        rowId: AuditingSideEffectRowId,
        tags: AuditingSideEffectTags,
        modelPath: AuditingSideEffectModelPath,
        modelName: AuditingSideEffectModelName,
        operationId: AuditingSideEffectOperationId,
        operationSort: AuditingSideEffectOperationSort,
        accountId: AuditingSideEffectAccountId,
        email: AuditingSideEffectEmail,
        event: AuditingSideEffectEvent,
        auditableId: AuditingSideEffectAuditableId,
        oldValue: AuditingSideEffectOldValue,
        newValue: AuditingSideEffectNewValue,
        ip: AuditingSideEffectIp,
        method: AuditingSideEffectMethod,
        baseUrl: AuditingSideEffectBaseUrl,
        params: AuditingSideEffectParams,
        query: AuditingSideEffectQuery,
        body: AuditingSideEffectBody,
        userAgent: AuditingSideEffectUserAgent,
        isRollback: AuditingSideEffectIsRollback,
        rollbackSideEffectId: AuditingSideEffectRollbackSideEffectId,
        createdAt: AuditingSideEffectCreatedAt,
        updatedAt: AuditingSideEffectUpdatedAt,
        deletedAt: AuditingSideEffectDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.tags = tags;
        this.modelPath = modelPath;
        this.modelName = modelName;
        this.operationId = operationId;
        this.operationSort = operationSort;
        this.accountId = accountId;
        this.email = email;
        this.event = event;
        this.auditableId = auditableId;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.ip = ip;
        this.method = method;
        this.baseUrl = baseUrl;
        this.params = params;
        this.query = query;
        this.body = body;
        this.userAgent = userAgent;
        this.isRollback = isRollback;
        this.rollbackSideEffectId = rollbackSideEffectId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: AuditingSideEffectId,
        rowId: AuditingSideEffectRowId,
        tags: AuditingSideEffectTags,
        modelPath: AuditingSideEffectModelPath,
        modelName: AuditingSideEffectModelName,
        operationId: AuditingSideEffectOperationId,
        operationSort: AuditingSideEffectOperationSort,
        accountId: AuditingSideEffectAccountId,
        email: AuditingSideEffectEmail,
        event: AuditingSideEffectEvent,
        auditableId: AuditingSideEffectAuditableId,
        oldValue: AuditingSideEffectOldValue,
        newValue: AuditingSideEffectNewValue,
        ip: AuditingSideEffectIp,
        method: AuditingSideEffectMethod,
        baseUrl: AuditingSideEffectBaseUrl,
        params: AuditingSideEffectParams,
        query: AuditingSideEffectQuery,
        body: AuditingSideEffectBody,
        userAgent: AuditingSideEffectUserAgent,
        isRollback: AuditingSideEffectIsRollback,
        rollbackSideEffectId: AuditingSideEffectRollbackSideEffectId,
        createdAt: AuditingSideEffectCreatedAt,
        updatedAt: AuditingSideEffectUpdatedAt,
        deletedAt: AuditingSideEffectDeletedAt,
    ): AuditingSideEffect {
        return new AuditingSideEffect(
            id,
            rowId,
            tags,
            modelPath,
            modelName,
            operationId,
            operationSort,
            accountId,
            email,
            event,
            auditableId,
            oldValue,
            newValue,
            ip,
            method,
            baseUrl,
            params,
            query,
            body,
            userAgent,
            isRollback,
            rollbackSideEffectId,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(event: {
        payload: AuditingSideEffect;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new AuditingCreatedSideEffectEvent({
                payload: {
                    id: event.payload.id.value,
                    tags: event.payload.tags?.value,
                    modelPath: event.payload.modelPath.value,
                    modelName: event.payload.modelName.value,
                    operationId: event.payload.operationId?.value,
                    operationSort: event.payload.operationSort?.value,
                    accountId: event.payload.accountId.value,
                    email: event.payload.email.value,
                    event: event.payload.event.value,
                    auditableId: event.payload.auditableId?.value,
                    oldValue: event.payload.oldValue?.value,
                    newValue: event.payload.newValue?.value,
                    ip: event.payload.ip?.value,
                    method: event.payload.method?.value,
                    baseUrl: event.payload.baseUrl?.value,
                    params: event.payload.params?.value,
                    query: event.payload.query?.value,
                    body: event.payload.body?.value,
                    userAgent: event.payload.userAgent?.value,
                    isRollback: event.payload.isRollback.value,
                    rollbackSideEffectId:
                        event.payload.rollbackSideEffectId?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: {
        payload: AuditingSideEffect;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new AuditingUpdatedSideEffectEvent({
                payload: {
                    id: event.payload.id?.value,
                    tags: event.payload.tags?.value,
                    modelPath: event.payload.modelPath?.value,
                    modelName: event.payload.modelName?.value,
                    operationId: event.payload.operationId?.value,
                    operationSort: event.payload.operationSort?.value,
                    accountId: event.payload.accountId?.value,
                    email: event.payload.email?.value,
                    event: event.payload.event?.value,
                    auditableId: event.payload.auditableId?.value,
                    oldValue: event.payload.oldValue?.value,
                    newValue: event.payload.newValue?.value,
                    ip: event.payload.ip?.value,
                    method: event.payload.method?.value,
                    baseUrl: event.payload.baseUrl?.value,
                    params: event.payload.params?.value,
                    query: event.payload.query?.value,
                    body: event.payload.body?.value,
                    userAgent: event.payload.userAgent?.value,
                    isRollback: event.payload.isRollback?.value,
                    rollbackSideEffectId:
                        event.payload.rollbackSideEffectId?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: {
        payload: AuditingSideEffect;
        cQMetadata?: CQMetadata;
    }): void {
        this.apply(
            new AuditingDeletedSideEffectEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    tags: event.payload.tags?.value,
                    modelPath: event.payload.modelPath.value,
                    modelName: event.payload.modelName.value,
                    operationId: event.payload.operationId?.value,
                    operationSort: event.payload.operationSort?.value,
                    accountId: event.payload.accountId.value,
                    email: event.payload.email.value,
                    event: event.payload.event.value,
                    auditableId: event.payload.auditableId?.value,
                    oldValue: event.payload.oldValue?.value,
                    newValue: event.payload.newValue?.value,
                    ip: event.payload.ip?.value,
                    method: event.payload.method?.value,
                    baseUrl: event.payload.baseUrl?.value,
                    params: event.payload.params?.value,
                    query: event.payload.query?.value,
                    body: event.payload.body?.value,
                    userAgent: event.payload.userAgent?.value,
                    isRollback: event.payload.isRollback.value,
                    rollbackSideEffectId:
                        event.payload.rollbackSideEffectId?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject {
        return {
            id: this.id.value,
            rowId: this.rowId.value,
            tags: this.tags?.value,
            modelPath: this.modelPath.value,
            modelName: this.modelName.value,
            operationId: this.operationId?.value,
            operationSort: this.operationSort?.value,
            accountId: this.accountId.value,
            email: this.email.value,
            event: this.event.value,
            auditableId: this.auditableId?.value,
            oldValue: this.oldValue?.value,
            newValue: this.newValue?.value,
            ip: this.ip?.value,
            method: this.method?.value,
            baseUrl: this.baseUrl?.value,
            params: this.params?.value,
            query: this.query?.value,
            body: this.body?.value,
            userAgent: this.userAgent?.value,
            isRollback: this.isRollback.value,
            rollbackSideEffectId: this.rollbackSideEffectId?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            tags: this.tags?.value,
            modelPath: this.modelPath.value,
            modelName: this.modelName.value,
            operationId: this.operationId?.value,
            operationSort: this.operationSort?.value,
            accountId: this.accountId.value,
            email: this.email.value,
            event: this.event.value,
            auditableId: this.auditableId?.value,
            oldValue: this.oldValue?.value,
            newValue: this.newValue?.value,
            ip: this.ip?.value,
            method: this.method?.value,
            baseUrl: this.baseUrl?.value,
            params: this.params?.value,
            query: this.query?.value,
            body: this.body?.value,
            userAgent: this.userAgent?.value,
            isRollback: this.isRollback.value,
            rollbackSideEffectId: this.rollbackSideEffectId?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
