import {
    AuditingCreatedSideEffectEvent,
    AuditingCreatedSideEffectsEvent,
    AuditingDeletedSideEffectEvent,
    AuditingDeletedSideEffectsEvent,
    AuditingSideEffect,
    AuditingUpdatedSideEffectEvent,
    AuditingUpdatedSideEffectsEvent,
} from '@app/auditing/side-effect';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingAddSideEffectsContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: AuditingSideEffect[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new AuditingCreatedSideEffectsEvent({
                payload: this.aggregateRoots.map(
                    (sideEffect) =>
                        new AuditingCreatedSideEffectEvent({
                            payload: {
                                id: sideEffect.id.value,
                                tags: sideEffect.tags?.value,
                                modelPath: sideEffect.modelPath.value,
                                modelName: sideEffect.modelName.value,
                                operationId: sideEffect.operationId?.value,
                                operationSort: sideEffect.operationSort?.value,
                                accountId: sideEffect.accountId.value,
                                email: sideEffect.email.value,
                                event: sideEffect.event.value,
                                auditableId: sideEffect.auditableId?.value,
                                oldValue: sideEffect.oldValue?.value,
                                newValue: sideEffect.newValue?.value,
                                ip: sideEffect.ip?.value,
                                method: sideEffect.method?.value,
                                baseUrl: sideEffect.baseUrl?.value,
                                params: sideEffect.params?.value,
                                query: sideEffect.query?.value,
                                body: sideEffect.body?.value,
                                userAgent: sideEffect.userAgent?.value,
                                isRollback: sideEffect.isRollback.value,
                                rollbackSideEffectId:
                                    sideEffect.rollbackSideEffectId?.value,
                                createdAt: sideEffect.createdAt?.value,
                                updatedAt: sideEffect.updatedAt?.value,
                                deletedAt: sideEffect.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new AuditingUpdatedSideEffectsEvent({
                payload: this.aggregateRoots.map(
                    (sideEffect) =>
                        new AuditingUpdatedSideEffectEvent({
                            payload: {
                                id: sideEffect.id.value,
                                tags: sideEffect.tags?.value,
                                modelPath: sideEffect.modelPath.value,
                                modelName: sideEffect.modelName.value,
                                operationId: sideEffect.operationId?.value,
                                operationSort: sideEffect.operationSort?.value,
                                accountId: sideEffect.accountId.value,
                                email: sideEffect.email.value,
                                event: sideEffect.event.value,
                                auditableId: sideEffect.auditableId?.value,
                                oldValue: sideEffect.oldValue?.value,
                                newValue: sideEffect.newValue?.value,
                                ip: sideEffect.ip?.value,
                                method: sideEffect.method?.value,
                                baseUrl: sideEffect.baseUrl?.value,
                                params: sideEffect.params?.value,
                                query: sideEffect.query?.value,
                                body: sideEffect.body?.value,
                                userAgent: sideEffect.userAgent?.value,
                                isRollback: sideEffect.isRollback.value,
                                rollbackSideEffectId:
                                    sideEffect.rollbackSideEffectId?.value,
                                createdAt: sideEffect.createdAt?.value,
                                updatedAt: sideEffect.updatedAt?.value,
                                deletedAt: sideEffect.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new AuditingDeletedSideEffectsEvent({
                payload: this.aggregateRoots.map(
                    (sideEffect) =>
                        new AuditingDeletedSideEffectEvent({
                            payload: {
                                id: sideEffect.id.value,
                                rowId: sideEffect.rowId.value,
                                tags: sideEffect.tags?.value,
                                modelPath: sideEffect.modelPath.value,
                                modelName: sideEffect.modelName.value,
                                operationId: sideEffect.operationId?.value,
                                operationSort: sideEffect.operationSort?.value,
                                accountId: sideEffect.accountId.value,
                                email: sideEffect.email.value,
                                event: sideEffect.event.value,
                                auditableId: sideEffect.auditableId?.value,
                                oldValue: sideEffect.oldValue?.value,
                                newValue: sideEffect.newValue?.value,
                                ip: sideEffect.ip?.value,
                                method: sideEffect.method?.value,
                                baseUrl: sideEffect.baseUrl?.value,
                                params: sideEffect.params?.value,
                                query: sideEffect.query?.value,
                                body: sideEffect.body?.value,
                                userAgent: sideEffect.userAgent?.value,
                                isRollback: sideEffect.isRollback.value,
                                rollbackSideEffectId:
                                    sideEffect.rollbackSideEffectId?.value,
                                createdAt: sideEffect.createdAt?.value,
                                updatedAt: sideEffect.updatedAt?.value,
                                deletedAt: sideEffect.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
