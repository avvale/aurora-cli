import { Injectable } from '@nestjs/common';
import { MockSeeder } from 'aurora-ts-core';
import {
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from '../../domain/value-objects';
import { OAuthApplication } from '../../domain/application.aggregate';
import { applications } from '../seeds/application.seed';
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
                    new ApplicationName(application.name),
                    new ApplicationCode(application.code),
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