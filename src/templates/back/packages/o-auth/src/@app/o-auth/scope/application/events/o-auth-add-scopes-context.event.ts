import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';
import { OAuthCreatedScopeEvent } from './o-auth-created-scope.event';
import { OAuthCreatedScopesEvent } from './o-auth-created-scopes.event';
import { OAuthUpdatedScopeEvent } from './o-auth-updated-scope.event';
import { OAuthUpdatedScopesEvent } from './o-auth-updated-scopes.event';
import { OAuthDeletedScopeEvent } from './o-auth-deleted-scope.event';
import { OAuthDeletedScopesEvent } from './o-auth-deleted-scopes.event';

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
                        scope.createdAt?.value,
                        scope.updatedAt?.value,
                        scope.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
