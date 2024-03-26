import { AuditingCreatedSideEffectEvent, AuditingCreatedSideEffectsEvent, AuditingDeletedSideEffectEvent, AuditingDeletedSideEffectsEvent, AuditingSideEffect, AuditingUpdatedAndIncrementedSideEffectEvent, AuditingUpdatedAndIncrementedSideEffectsEvent, AuditingUpdatedSideEffectEvent, AuditingUpdatedSideEffectsEvent } from '@app/auditing/side-effect';
import { AggregateRoot } from '@nestjs/cqrs';

export class AuditingAddSideEffectsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AuditingSideEffect[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AuditingCreatedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
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
                        sideEffect.method?.value,
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
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AuditingUpdatedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
                    new AuditingUpdatedSideEffectEvent(
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
                        sideEffect.method?.value,
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
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new AuditingUpdatedAndIncrementedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
                    new AuditingUpdatedAndIncrementedSideEffectEvent(
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
                        sideEffect.method?.value,
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
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AuditingDeletedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
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
                        sideEffect.method?.value,
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
                ),
            ),
        );
    }
}
