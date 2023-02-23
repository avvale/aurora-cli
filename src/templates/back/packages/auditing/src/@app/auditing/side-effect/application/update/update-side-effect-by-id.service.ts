import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
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

@Injectable()
export class UpdateSideEffectByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        payload: {
            id: SideEffectId;
            tags?: SideEffectTags;
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
            isRollback?: SideEffectIsRollback;
            rollbackSideEffectId?: SideEffectRollbackSideEffectId;
        },
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
            new SideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update by id
        await this.repository.updateById(sideEffect, { constraint, cQMetadata, updateByIdOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const sideEffectRegister = this.publisher.mergeObjectContext(
            sideEffect,
        );

        sideEffectRegister.updated(sideEffect); // apply event to model events
        sideEffectRegister.commit(); // commit all events of model
    }
}