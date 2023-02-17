import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
            tags: SideEffectTags;
            isRollback: SideEffectIsRollback;
            rollbackSideEffectId: SideEffectRollbackSideEffectId;
        },
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