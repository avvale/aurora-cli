import {
    OAuthCreatedScopeEvent,
    OAuthCreatedScopesEvent,
    OAuthDeletedScopeEvent,
    OAuthDeletedScopesEvent,
    OAuthScope,
} from '@app/o-auth/scope';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthAddScopesContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: OAuthScope[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new OAuthCreatedScopesEvent({
                payload: this.aggregateRoots.map(
                    (scope) =>
                        new OAuthCreatedScopeEvent({
                            payload: {
                                id: scope.id.value,
                                code: scope.code.value,
                                name: scope.name.value,
                                roleIds: scope.roleIds?.value,
                                createdAt: scope.createdAt?.value,
                                updatedAt: scope.updatedAt?.value,
                                deletedAt: scope.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new OAuthDeletedScopesEvent({
                payload: this.aggregateRoots.map(
                    (scope) =>
                        new OAuthDeletedScopeEvent({
                            payload: {
                                id: scope.id.value,
                                rowId: scope.rowId.value,
                                code: scope.code.value,
                                name: scope.name.value,
                                roleIds: scope.roleIds?.value,
                                createdAt: scope.createdAt?.value,
                                updatedAt: scope.updatedAt?.value,
                                deletedAt: scope.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
