import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from '../../domain/value-objects';
import { OAuthScope } from '../../domain/o-auth-scope.aggregate';
import { oAuthMockScopeData } from './o-auth-mock-scope.data';
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
