import { AggregateRoot } from '@nestjs/cqrs';
import { OAuthScope } from '../../domain/scope.aggregate';
import { CreatedScopeEvent } from './created-scope.event';
import { CreatedScopesEvent } from './created-scopes.event';
import { DeletedScopeEvent } from './deleted-scope.event';
import { DeletedScopesEvent } from './deleted-scopes.event';

export class AddScopesContextEvent extends AggregateRoot
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
            new CreatedScopesEvent(
                this.aggregateRoots.map(scope =>
                    new CreatedScopeEvent(
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
            new DeletedScopesEvent(
                this.aggregateRoots.map(scope =>
                    new DeletedScopeEvent(
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