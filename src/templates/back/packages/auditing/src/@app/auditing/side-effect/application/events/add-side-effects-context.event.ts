import { AggregateRoot } from '@nestjs/cqrs';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import { CreatedSideEffectEvent } from './created-side-effect.event';
import { CreatedSideEffectsEvent } from './created-side-effects.event';
import { UpdatedSideEffectEvent } from './updated-side-effect.event';
import { UpdatedSideEffectsEvent } from './updated-side-effects.event';
import { DeletedSideEffectEvent } from './deleted-side-effect.event';
import { DeletedSideEffectsEvent } from './deleted-side-effects.event';

export class AddSideEffectsContextEvent extends AggregateRoot
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
            new CreatedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
                    new CreatedSideEffectEvent(
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
                        sideEffect.method.value,
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
            new UpdatedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
                    new UpdatedSideEffectEvent(
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
                        sideEffect.method.value,
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
            new DeletedSideEffectsEvent(
                this.aggregateRoots.map(sideEffect =>
                    new DeletedSideEffectEvent(
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
                        sideEffect.method.value,
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