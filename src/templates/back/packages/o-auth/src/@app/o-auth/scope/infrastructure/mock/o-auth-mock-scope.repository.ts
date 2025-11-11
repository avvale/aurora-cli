import {
    OAuthIScopeRepository,
    oAuthMockScopeData,
    OAuthScope,
} from '@app/o-auth/scope';
import {
    OAuthScopeCode,
    OAuthScopeCreatedAt,
    OAuthScopeDeletedAt,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
    OAuthScopeRowId,
    OAuthScopeUpdatedAt,
} from '@app/o-auth/scope/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthMockScopeRepository
    extends MockRepository<OAuthScope>
    implements OAuthIScopeRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthScope';
    public collectionSource: OAuthScope[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>oAuthMockScopeData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                OAuthScope.register(
                    new OAuthScopeId(itemCollection.id),
                    new OAuthScopeRowId(itemCollection.rowId),
                    new OAuthScopeCode(itemCollection.code),
                    new OAuthScopeName(itemCollection.name),
                    new OAuthScopeRoleIds(itemCollection.roleIds),
                    new OAuthScopeCreatedAt(itemCollection.createdAt),
                    new OAuthScopeUpdatedAt(itemCollection.updatedAt),
                    new OAuthScopeDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
