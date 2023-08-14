import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { OAuthIApplicationRepository } from '@app/o-auth/application/domain/o-auth-application.repository';
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
} from '@app/o-auth/application/domain/value-objects';
import { OAuthApplication } from '../../domain/o-auth-application.aggregate';
import { oAuthMockApplicationData } from './o-auth-mock-application.data';

@Injectable()
export class OAuthMockApplicationRepository extends MockRepository<OAuthApplication> implements OAuthIApplicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthApplication';
    public collectionSource: OAuthApplication[];
    public deletedAtInstance: OAuthApplicationDeletedAt = new OAuthApplicationDeletedAt(null);

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

        for (const itemCollection of <any[]>oAuthMockApplicationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(OAuthApplication.register(
                new OAuthApplicationId(itemCollection.id),
                new OAuthApplicationCode(itemCollection.code),
                new OAuthApplicationName(itemCollection.name),
                new OAuthApplicationSecret(itemCollection.secret),
                new OAuthApplicationIsMaster(itemCollection.isMaster),
                new OAuthApplicationClientIds(itemCollection.clientIds),
                new OAuthApplicationCreatedAt(itemCollection.createdAt),
                new OAuthApplicationUpdatedAt(itemCollection.updatedAt),
                new OAuthApplicationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
