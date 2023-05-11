import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    ApplicationId,
    ApplicationCode,
    ApplicationName,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';
import { OAuthApplication } from '../../domain/application.aggregate';
import { applications } from './mock-application.data';
import * as _ from 'lodash';

@Injectable()
export class MockApplicationSeeder extends MockSeeder<OAuthApplication>
{
    public collectionSource: OAuthApplication[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const application of _.orderBy(applications, ['id']))
        {
            this.collectionSource.push(
                OAuthApplication.register(
                    new ApplicationId(application.id),
                    new ApplicationCode(application.code),
                    new ApplicationName(application.name),
                    new ApplicationSecret(application.secret),
                    new ApplicationIsMaster(application.isMaster),
                    new ApplicationClientIds(application.clientIds),
                    new ApplicationCreatedAt({ currentTimestamp: true }),
                    new ApplicationUpdatedAt({ currentTimestamp: true }),
                    new ApplicationDeletedAt(null),
                ),
            );
        }
    }
}