import { OAuthApplicationClient, oAuthMockApplicationClientData } from '@app/o-auth/application-client';
import {
    OAuthApplicationClientApplicationId,
    OAuthApplicationClientClientId,
} from '@app/o-auth/application-client/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockApplicationClientSeeder extends MockSeeder<OAuthApplicationClient>
{
    public collectionSource: OAuthApplicationClient[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationClient of _.orderBy(oAuthMockApplicationClientData, ['id']))
        {
            this.collectionSource.push(
                OAuthApplicationClient.register(
                    new OAuthApplicationClientApplicationId(applicationClient.applicationId),
                    new OAuthApplicationClientClientId(applicationClient.clientId),
                ),
            );
        }
    }
}
