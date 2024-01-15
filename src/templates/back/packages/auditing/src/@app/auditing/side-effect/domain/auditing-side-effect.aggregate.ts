/* eslint-disable key-spacing */
import { AuditingCreatedSideEffectEvent, AuditingDeletedSideEffectEvent, AuditingUpdatedSideEffectEvent } from '@app/auditing/side-effect';
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
    AuditingSideEffectTags,
    AuditingSideEffectUpdatedAt,
    AuditingSideEffectUserAgent,
} from '@app/auditing/side-effect/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingSideEffect extends AggregateRoot
{
    id: AuditingSideEffectId;
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
    )
    {
        super();
        this.id = id;
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
    ): AuditingSideEffect
    {
        return new AuditingSideEffect(
            id,
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

    created(sideEffect: AuditingSideEffect): void
    {
        this.apply(
            new AuditingCreatedSideEffectEvent(
                sideEffect.id.value,
                sideEffect.tags?.value,
                sideEffect.modelPath.value,
                sideEffect.modelName.value,
                sideEffect.operationId?.value,
                sideEffect.operationSort?.value,
                sideEffect.accountId.value,
                sideEffect.email.value,
                sideEffect.event.value,
                sideEffect.auditableId?.value,
                sideEffect.oldValue?.value,
                sideEffect.newValue?.value,
                sideEffect.ip?.value,
                sideEffect.method.value,
                sideEffect.baseUrl?.value,
                sideEffect.params?.value,
                sideEffect.query?.value,
                sideEffect.body?.value,
                sideEffect.userAgent?.value,
                sideEffect.isRollback.value,
                sideEffect.rollbackSideEffectId?.value,
                sideEffect.createdAt?.value,
                sideEffect.updatedAt?.value,
                sideEffect.deletedAt?.value,
            ),
        );
    }

    updated(sideEffect: AuditingSideEffect): void
    {
        this.apply(
            new AuditingUpdatedSideEffectEvent(
                sideEffect.id?.value,
                sideEffect.tags?.value,
                sideEffect.modelPath?.value,
                sideEffect.modelName?.value,
                sideEffect.operationId?.value,
                sideEffect.operationSort?.value,
                sideEffect.accountId?.value,
                sideEffect.email?.value,
                sideEffect.event?.value,
                sideEffect.auditableId?.value,
                sideEffect.oldValue?.value,
                sideEffect.newValue?.value,
                sideEffect.ip?.value,
                sideEffect.method?.value,
                sideEffect.baseUrl?.value,
                sideEffect.params?.value,
                sideEffect.query?.value,
                sideEffect.body?.value,
                sideEffect.userAgent?.value,
                sideEffect.isRollback?.value,
                sideEffect.rollbackSideEffectId?.value,
                sideEffect.createdAt?.value,
                sideEffect.updatedAt?.value,
                sideEffect.deletedAt?.value,
            ),
        );
    }

    deleted(sideEffect: AuditingSideEffect): void
    {
        this.apply(
            new AuditingDeletedSideEffectEvent(
                sideEffect.id.value,
                sideEffect.tags?.value,
                sideEffect.modelPath.value,
                sideEffect.modelName.value,
                sideEffect.operationId?.value,
                sideEffect.operationSort?.value,
                sideEffect.accountId.value,
                sideEffect.email.value,
                sideEffect.event.value,
                sideEffect.auditableId?.value,
                sideEffect.oldValue?.value,
                sideEffect.newValue?.value,
                sideEffect.ip?.value,
                sideEffect.method.value,
                sideEffect.baseUrl?.value,
                sideEffect.params?.value,
                sideEffect.query?.value,
                sideEffect.body?.value,
                sideEffect.userAgent?.value,
                sideEffect.isRollback.value,
                sideEffect.rollbackSideEffectId?.value,
                sideEffect.createdAt?.value,
                sideEffect.updatedAt?.value,
                sideEffect.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
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
            method: this.method.value,
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
    toRepository(): LiteralObject
    {
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
            method: this.method.value,
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
