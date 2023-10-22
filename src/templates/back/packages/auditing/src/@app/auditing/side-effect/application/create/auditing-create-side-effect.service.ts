import { AuditingISideEffectRepository, AuditingSideEffect } from '@app/auditing/side-effect';
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
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AuditingCreateSideEffectService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        payload: {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const sideEffect = AuditingSideEffect.register(
            payload.id,
            payload.tags,
            payload.modelPath,
            payload.modelName,
            payload.operationId,
            payload.operationSort,
            payload.accountId,
            payload.email,
            payload.event,
            payload.auditableId,
            payload.oldValue,
            payload.newValue,
            payload.ip,
            payload.method,
            payload.baseUrl,
            payload.params,
            payload.query,
            payload.body,
            payload.userAgent,
            payload.isRollback,
            payload.rollbackSideEffectId,
            new AuditingSideEffectCreatedAt({ currentTimestamp: true }),
            new AuditingSideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            sideEffect,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const sideEffectRegister = this.publisher.mergeObjectContext(
            sideEffect,
        );

        sideEffectRegister.created(sideEffect); // apply event to model events
        sideEffectRegister.commit(); // commit all events of model
    }
}
