import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AuditingSideEffectId,
    AuditingSideEffectTags,
    AuditingSideEffectModelPath,
    AuditingSideEffectModelName,
    AuditingSideEffectOperationId,
    AuditingSideEffectOperationSort,
    AuditingSideEffectAccountId,
    AuditingSideEffectEmail,
    AuditingSideEffectEvent,
    AuditingSideEffectAuditableId,
    AuditingSideEffectOldValue,
    AuditingSideEffectNewValue,
    AuditingSideEffectIp,
    AuditingSideEffectMethod,
    AuditingSideEffectBaseUrl,
    AuditingSideEffectParams,
    AuditingSideEffectQuery,
    AuditingSideEffectBody,
    AuditingSideEffectUserAgent,
    AuditingSideEffectIsRollback,
    AuditingSideEffectRollbackSideEffectId,
    AuditingSideEffectCreatedAt,
    AuditingSideEffectUpdatedAt,
    AuditingSideEffectDeletedAt,
} from '../../domain/value-objects';
import { AuditingISideEffectRepository } from '../../domain/auditing-side-effect.repository';
import { AuditingSideEffect } from '../../domain/auditing-side-effect.aggregate';
import { AuditingAddSideEffectsContextEvent } from '../events/auditing-add-side-effects-context.event';

@Injectable()
export class AuditingUpdateSideEffectsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AuditingISideEffectRepository,
    ) {}

    async main(
        payload: {
            id?: AuditingSideEffectId;
            tags?: AuditingSideEffectTags;
            modelPath?: AuditingSideEffectModelPath;
            modelName?: AuditingSideEffectModelName;
            operationId?: AuditingSideEffectOperationId;
            operationSort?: AuditingSideEffectOperationSort;
            accountId?: AuditingSideEffectAccountId;
            email?: AuditingSideEffectEmail;
            event?: AuditingSideEffectEvent;
            auditableId?: AuditingSideEffectAuditableId;
            oldValue?: AuditingSideEffectOldValue;
            newValue?: AuditingSideEffectNewValue;
            ip?: AuditingSideEffectIp;
            method?: AuditingSideEffectMethod;
            baseUrl?: AuditingSideEffectBaseUrl;
            params?: AuditingSideEffectParams;
            query?: AuditingSideEffectQuery;
            body?: AuditingSideEffectBody;
            userAgent?: AuditingSideEffectUserAgent;
            isRollback?: AuditingSideEffectIsRollback;
            rollbackSideEffectId?: AuditingSideEffectRollbackSideEffectId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new AuditingSideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            sideEffect,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const sideEffects = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const sideEffectsRegister = this.publisher.mergeObjectContext(
            new AuditingAddSideEffectsContextEvent(sideEffects),
        );

        sideEffectsRegister.updated(); // apply event to model events
        sideEffectsRegister.commit(); // commit all events of model
    }
}
