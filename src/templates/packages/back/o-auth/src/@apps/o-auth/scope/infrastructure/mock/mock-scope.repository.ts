import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurora-ts/core';
import { IScopeRepository } from '@apps/o-auth/scope/domain/scope.repository';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from '@apps/o-auth/scope/domain/value-objects';
import { OAuthScope } from '../../domain/scope.aggregate';
import { scopes } from '../seeds/scope.seed';

@Injectable()
export class MockScopeRepository extends MockRepository<OAuthScope> implements IScopeRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthScope';
    public collectionSource: OAuthScope[];
    public deletedAtInstance: ScopeDeletedAt = new ScopeDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>scopes)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthScope.register(
                new ScopeId(itemCollection.id),
                new ScopeCode(itemCollection.code),
                new ScopeName(itemCollection.name),
                new ScopeCreatedAt(itemCollection.createdAt),
                new ScopeUpdatedAt(itemCollection.updatedAt),
                new ScopeDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}