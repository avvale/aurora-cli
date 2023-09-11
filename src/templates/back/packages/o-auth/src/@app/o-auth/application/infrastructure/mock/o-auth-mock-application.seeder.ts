import { OAuthApplication, oAuthMockApplicationData } from '@app/o-auth/application';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationCreatedAt,
    OAuthApplicationDeletedAt,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class OAuthMockApplicationSeeder extends MockSeeder<OAuthApplication>
{
    public collectionSource: OAuthApplication[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const application of _.orderBy(oAuthMockApplicationData, ['id']))
        {
            this.collectionSource.push(
                OAuthApplication.register(
                    new OAuthApplicationId(application.id),
                    new OAuthApplicationCode(application.code),
                    new OAuthApplicationName(application.name),
                    new OAuthApplicationSecret(application.secret),
                    new OAuthApplicationIsMaster(application.isMaster),
                    new OAuthApplicationClientIds(application.clientIds),
                    new OAuthApplicationCreatedAt({ currentTimestamp: true }),
                    new OAuthApplicationUpdatedAt({ currentTimestamp: true }),
                    new OAuthApplicationDeletedAt(null),
                ),
            );
        }
    }
}
