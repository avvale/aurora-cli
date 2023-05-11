import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IApplicationRepository } from '@app/o-auth/application/domain/application.repository';
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
} from '@app/o-auth/application/domain/value-objects';
import { OAuthApplication } from '../../domain/application.aggregate';
import { applications } from './mock-application.data';

@Injectable()
export class MockApplicationRepository extends MockRepository<OAuthApplication> implements IApplicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthApplication';
    public collectionSource: OAuthApplication[];
    public deletedAtInstance: ApplicationDeletedAt = new ApplicationDeletedAt(null);

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

        for (const itemCollection of <any[]>applications)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthApplication.register(
                new ApplicationId(itemCollection.id),
                new ApplicationCode(itemCollection.code),
                new ApplicationName(itemCollection.name),
                new ApplicationSecret(itemCollection.secret),
                new ApplicationIsMaster(itemCollection.isMaster),
                new ApplicationClientIds(itemCollection.clientIds),
                new ApplicationCreatedAt(itemCollection.createdAt),
                new ApplicationUpdatedAt(itemCollection.updatedAt),
                new ApplicationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}