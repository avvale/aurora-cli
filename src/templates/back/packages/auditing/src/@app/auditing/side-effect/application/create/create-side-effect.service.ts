import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurora-ts/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import {
    SideEffectAccountId,
    SideEffectAuditableId,
    SideEffectBaseUrl,
    SideEffectBody,
    SideEffectCreatedAt,
    SideEffectDeletedAt,
    SideEffectEmail,
    SideEffectEvent,
    SideEffectId,
    SideEffectIp,
    SideEffectIsRollback,
    SideEffectMethod,
    SideEffectModelName,
    SideEffectModelPath,
    SideEffectNewValue,
    SideEffectOldValue,
    SideEffectOperationId,
    SideEffectOperationSort,
    SideEffectParams,
    SideEffectQuery,
    SideEffectRollbackSideEffectId,
    SideEffectTags,
    SideEffectUpdatedAt,
    SideEffectUserAgent,
} from '../../domain/value-objects';

@Injectable()
export class CreateSideEffectService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        payload: {
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
            new SideEffectCreatedAt({ currentTimestamp: true }),
            new SideEffectUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(sideEffect, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const sideEffectRegister = this.publisher.mergeObjectContext(
            sideEffect,
        );

        sideEffectRegister.created(sideEffect); // apply event to model events
        sideEffectRegister.commit(); // commit all events of model
    }
}