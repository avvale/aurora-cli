import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { OAuthIScopeRepository } from '@app/o-auth/scope/domain/o-auth-scope.repository';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '@app/o-auth/scope/domain/value-objects';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';
import { oAuthMockScopeData } from './o-auth-mock-scope.data';

@Injectable()
export class OAuthMockScopeRepository extends MockRepository<OAuthScope> implements OAuthIScopeRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthScope';
    public collectionSource: OAuthScope[];
    public deletedAtInstance: OAuthScopeDeletedAt = new OAuthScopeDeletedAt(null);

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

        for (const itemCollection of <any[]>oAuthMockScopeData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthScope.register(
                new OAuthScopeId(itemCollection.id),
                new OAuthScopeCode(itemCollection.code),
                new OAuthScopeName(itemCollection.name),
                new OAuthScopeCreatedAt(itemCollection.createdAt),
                new OAuthScopeUpdatedAt(itemCollection.updatedAt),
                new OAuthScopeDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
