import { AuditingAddSideEffectsContextEvent, AuditingISideEffectRepository, AuditingSideEffect } from '@app/auditing/side-effect';
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
export class AuditingCreateSideEffectsService
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateSideEffects = payload.map(sideEffect => AuditingSideEffect.register(
            sideEffect.id,
            sideEffect.tags,
            sideEffect.modelPath,
            sideEffect.modelName,
            sideEffect.operationId,
            sideEffect.operationSort,
            sideEffect.accountId,
            sideEffect.email,
            sideEffect.event,
            sideEffect.auditableId,
            sideEffect.oldValue,
            sideEffect.newValue,
            sideEffect.ip,
            sideEffect.method,
            sideEffect.baseUrl,
            sideEffect.params,
            sideEffect.query,
            sideEffect.body,
            sideEffect.userAgent,
            sideEffect.isRollback,
            sideEffect.rollbackSideEffectId,
            new AuditingSideEffectCreatedAt({ currentTimestamp: true }),
            new AuditingSideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateSideEffects,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddSideEffectsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const sideEffectsRegistered = this.publisher.mergeObjectContext(new AuditingAddSideEffectsContextEvent(aggregateSideEffects));

        sideEffectsRegistered.created(); // apply event to model events
        sideEffectsRegistered.commit(); // commit all events of model
    }
}
