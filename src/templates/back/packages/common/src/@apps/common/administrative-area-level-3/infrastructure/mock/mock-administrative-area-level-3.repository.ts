import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/administrative-area-level-3.repository';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommonAdministrativeAreaLevel3 } from '../../domain/administrative-area-level-3.aggregate';
import { administrativeAreasLevel3 } from '../seeds/administrative-area-level-3.seed';

@Injectable()
export class MockAdministrativeAreaLevel3Repository extends MockRepository<CommonAdministrativeAreaLevel3> implements IAdministrativeAreaLevel3Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel3';
    public collectionSource: CommonAdministrativeAreaLevel3[];
    public deletedAtInstance: AdministrativeAreaLevel3DeletedAt = new AdministrativeAreaLevel3DeletedAt(null);

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

        for (const itemCollection of <any[]>administrativeAreasLevel3)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAdministrativeAreaLevel3.register(
                new AdministrativeAreaLevel3Id(itemCollection.id),
                new AdministrativeAreaLevel3CountryId(itemCollection.countryId),
                new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(itemCollection.administrativeAreaLevel1Id),
                new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(itemCollection.administrativeAreaLevel2Id),
                new AdministrativeAreaLevel3Code(itemCollection.code),
                new AdministrativeAreaLevel3CustomCode(itemCollection.customCode),
                new AdministrativeAreaLevel3Name(itemCollection.name),
                new AdministrativeAreaLevel3Slug(itemCollection.slug),
                new AdministrativeAreaLevel3Latitude(itemCollection.latitude),
                new AdministrativeAreaLevel3Longitude(itemCollection.longitude),
                new AdministrativeAreaLevel3Zoom(itemCollection.zoom),
                new AdministrativeAreaLevel3CreatedAt(itemCollection.createdAt),
                new AdministrativeAreaLevel3UpdatedAt(itemCollection.updatedAt),
                new AdministrativeAreaLevel3DeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}