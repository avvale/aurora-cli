import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import {
    SideEffectId,
    SideEffectTags,
    SideEffectModelPath,
    SideEffectModelName,
    SideEffectOperationId,
    SideEffectOperationSort,
    SideEffectAccountId,
    SideEffectEmail,
    SideEffectEvent,
    SideEffectAuditableId,
    SideEffectOldValue,
    SideEffectNewValue,
    SideEffectIp,
    SideEffectMethod,
    SideEffectBaseUrl,
    SideEffectParams,
    SideEffectQuery,
    SideEffectBody,
    SideEffectUserAgent,
    SideEffectIsRollback,
    SideEffectRollbackSideEffectId,
    SideEffectCreatedAt,
    SideEffectUpdatedAt,
    SideEffectDeletedAt,
} from '../../domain/value-objects';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import { AddSideEffectsContextEvent } from '../events/add-side-effects-context.event';

@Injectable()
export class CreateSideEffectsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        sideEffects: {
            id: SideEffectId;
            tags: SideEffectTags;
            modelPath: SideEffectModelPath;
            modelName: SideEffectModelName;
            operationId: SideEffectOperationId;
            operationSort: SideEffectOperationSort;
            accountId: SideEffectAccountId;
            email: SideEffectEmail;
            event: SideEffectEvent;
            auditableId: SideEffectAuditableId;
            oldValue: SideEffectOldValue;
            newValue: SideEffectNewValue;
            ip: SideEffectIp;
            method: SideEffectMethod;
            baseUrl: SideEffectBaseUrl;
            params: SideEffectParams;
            query: SideEffectQuery;
            body: SideEffectBody;
            userAgent: SideEffectUserAgent;
            isRollback: SideEffectIsRollback;
            rollbackSideEffectId: SideEffectRollbackSideEffectId;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateSideEffects = sideEffects.map(sideEffect => AuditingSideEffect.register(
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
            new SideEffectCreatedAt({ currentTimestamp: true }),
            new SideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateSideEffects, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddSideEffectsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const sideEffectsRegistered = this.publisher.mergeObjectContext(new AddSideEffectsContextEvent(aggregateSideEffects));

        sideEffectsRegistered.created(); // apply event to model events
        sideEffectsRegistered.commit(); // commit all events of model
    }
}