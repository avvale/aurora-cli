import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.repository';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommonAdministrativeAreaLevel2 } from '../../domain/administrative-area-level-2.aggregate';
import { administrativeAreasLevel2 } from '../seeds/administrative-area-level-2.seed';

@Injectable()
export class MockAdministrativeAreaLevel2Repository extends MockRepository<CommonAdministrativeAreaLevel2> implements IAdministrativeAreaLevel2Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel2';
    public collectionSource: CommonAdministrativeAreaLevel2[];
    public deletedAtInstance: AdministrativeAreaLevel2DeletedAt = new AdministrativeAreaLevel2DeletedAt(null);

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

        for (const itemCollection of <any[]>administrativeAreasLevel2)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAdministrativeAreaLevel2.register(
                new AdministrativeAreaLevel2Id(itemCollection.id),
                new AdministrativeAreaLevel2CountryId(itemCollection.countryId),
                new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(itemCollection.administrativeAreaLevel1Id),
                new AdministrativeAreaLevel2Code(itemCollection.code),
                new AdministrativeAreaLevel2CustomCode(itemCollection.customCode),
                new AdministrativeAreaLevel2Name(itemCollection.name),
                new AdministrativeAreaLevel2Slug(itemCollection.slug),
                new AdministrativeAreaLevel2Latitude(itemCollection.latitude),
                new AdministrativeAreaLevel2Longitude(itemCollection.longitude),
                new AdministrativeAreaLevel2Zoom(itemCollection.zoom),
                new AdministrativeAreaLevel2CreatedAt(itemCollection.createdAt),
                new AdministrativeAreaLevel2UpdatedAt(itemCollection.updatedAt),
                new AdministrativeAreaLevel2DeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}