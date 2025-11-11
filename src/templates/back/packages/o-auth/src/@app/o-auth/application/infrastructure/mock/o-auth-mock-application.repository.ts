import {
    OAuthApplication,
    OAuthIApplicationRepository,
    oAuthMockApplicationData,
} from '@app/o-auth/application';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationCreatedAt,
    OAuthApplicationDeletedAt,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationRowId,
    OAuthApplicationSecret,
    OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthMockApplicationRepository
    extends MockRepository<OAuthApplication>
    implements OAuthIApplicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'OAuthApplication';
    public collectionSource: OAuthApplication[];

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

        for (const itemCollection of <any[]>oAuthMockApplicationData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                OAuthApplication.register(
                    new OAuthApplicationId(itemCollection.id),
                    new OAuthApplicationRowId(itemCollection.rowId),
                    new OAuthApplicationCode(itemCollection.code),
                    new OAuthApplicationName(itemCollection.name),
                    new OAuthApplicationSecret(itemCollection.secret),
                    new OAuthApplicationIsMaster(itemCollection.isMaster),
                    new OAuthApplicationClientIds(itemCollection.clientIds),
                    new OAuthApplicationCreatedAt(itemCollection.createdAt),
                    new OAuthApplicationUpdatedAt(itemCollection.updatedAt),
                    new OAuthApplicationDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
