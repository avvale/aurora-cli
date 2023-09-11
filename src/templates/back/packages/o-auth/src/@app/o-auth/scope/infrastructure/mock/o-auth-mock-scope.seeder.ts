import { oAuthMockScopeData, OAuthScope } from '@app/o-auth/scope';
import {
    OAuthScopeCode,
    OAuthScopeCreatedAt,
    OAuthScopeDeletedAt,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeUpdatedAt,
} from '@app/o-auth/scope/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockScopeSeeder extends MockSeeder<OAuthScope>
{
    public collectionSource: OAuthScope[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const scope of _.orderBy(oAuthMockScopeData, ['id']))
        {
            this.collectionSource.push(
                OAuthScope.register(
                    new OAuthScopeId(scope.id),
                    new OAuthScopeCode(scope.code),
                    new OAuthScopeName(scope.name),
                    new OAuthScopeCreatedAt({ currentTimestamp: true }),
                    new OAuthScopeUpdatedAt({ currentTimestamp: true }),
                    new OAuthScopeDeletedAt(null),
                ),
            );
        }
    }
}
