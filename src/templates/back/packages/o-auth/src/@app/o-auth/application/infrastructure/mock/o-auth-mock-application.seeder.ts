import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';
import { oAuthMockApplicationData } from './o-auth-mock-application.data';
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
