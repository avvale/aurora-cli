import { OAuthCreatedScopeEvent, OAuthCreatedScopesEvent, OAuthDeletedScopeEvent, OAuthDeletedScopesEvent, OAuthScope, OAuthUpdatedScopeEvent, OAuthUpdatedScopesEvent } from '@app/o-auth/scope';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddScopesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: OAuthScope[] = [],
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
            new OAuthCreatedScopesEvent(
                this.aggregateRoots.map(scope =>
                    new OAuthCreatedScopeEvent(
                        scope.id.value,
                        scope.code.value,
                        scope.name.value,
                        scope.roleIds?.value,
                        scope.createdAt?.value,
                        scope.updatedAt?.value,
                        scope.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new OAuthUpdatedScopesEvent(
                this.aggregateRoots.map(scope =>
                    new OAuthUpdatedScopeEvent(
                        scope.id.value,
                        scope.code.value,
                        scope.name.value,
                        scope.roleIds?.value,
                        scope.createdAt?.value,
                        scope.updatedAt?.value,
                        scope.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new OAuthDeletedScopesEvent(
                this.aggregateRoots.map(scope =>
                    new OAuthDeletedScopeEvent(
                        scope.id.value,
                        scope.code.value,
                        scope.name.value,
                        scope.roleIds?.value,
                        scope.createdAt?.value,
                        scope.updatedAt?.value,
                        scope.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
