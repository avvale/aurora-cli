import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import {
    SideEffectId,
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
    SideEffectTags,
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
export class UpdateSideEffectsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        payload: {
            id?: SideEffectId;
            modelPath?: SideEffectModelPath;
            modelName?: SideEffectModelName;
            operationId?: SideEffectOperationId;
            operationSort?: SideEffectOperationSort;
            accountId?: SideEffectAccountId;
            email?: SideEffectEmail;
            event?: SideEffectEvent;
            auditableId?: SideEffectAuditableId;
            oldValue?: SideEffectOldValue;
            newValue?: SideEffectNewValue;
            ip?: SideEffectIp;
            method?: SideEffectMethod;
            baseUrl?: SideEffectBaseUrl;
            params?: SideEffectParams;
            query?: SideEffectQuery;
            body?: SideEffectBody;
            userAgent?: SideEffectUserAgent;
            tags?: SideEffectTags;
            isRollback?: SideEffectIsRollback;
            rollbackSideEffectId?: SideEffectRollbackSideEffectId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const sideEffect = AuditingSideEffect.register(
            payload.id,
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
            payload.tags,
            payload.isRollback,
            payload.rollbackSideEffectId,
            null, // createdAt
            new SideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(sideEffect, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const sideEffects = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const sideEffectsRegister = this.publisher.mergeObjectContext(
            new AddSideEffectsContextEvent(sideEffects),
        );

        sideEffectsRegister.updated(); // apply event to model events
        sideEffectsRegister.commit(); // commit all events of model
    }
}