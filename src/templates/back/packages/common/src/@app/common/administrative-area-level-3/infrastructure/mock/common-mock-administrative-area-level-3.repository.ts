import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3/domain/common-administrative-area-level-3.repository';
import {
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3Zoom,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3CreatedAt,
    CommonAdministrativeAreaLevel3UpdatedAt,
    CommonAdministrativeAreaLevel3DeletedAt,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommonAdministrativeAreaLevel3 } from '../../domain/common-administrative-area-level-3.aggregate';
import { commonMockAdministrativeAreaLevel3Data } from './common-mock-administrative-area-level-3.data';

@Injectable()
export class CommonMockAdministrativeAreaLevel3Repository extends MockRepository<CommonAdministrativeAreaLevel3> implements CommonIAdministrativeAreaLevel3Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel3';
    public collectionSource: CommonAdministrativeAreaLevel3[];
    public deletedAtInstance: CommonAdministrativeAreaLevel3DeletedAt = new CommonAdministrativeAreaLevel3DeletedAt(null);

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

        for (const itemCollection of <any[]>commonMockAdministrativeAreaLevel3Data)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAdministrativeAreaLevel3.register(
                new CommonAdministrativeAreaLevel3Id(itemCollection.id),
                new CommonAdministrativeAreaLevel3CountryId(itemCollection.countryId),
                new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(itemCollection.administrativeAreaLevel1Id),
                new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(itemCollection.administrativeAreaLevel2Id),
                new CommonAdministrativeAreaLevel3Code(itemCollection.code),
                new CommonAdministrativeAreaLevel3CustomCode(itemCollection.customCode),
                new CommonAdministrativeAreaLevel3Name(itemCollection.name),
                new CommonAdministrativeAreaLevel3Slug(itemCollection.slug),
                new CommonAdministrativeAreaLevel3Latitude(itemCollection.latitude),
                new CommonAdministrativeAreaLevel3Longitude(itemCollection.longitude),
                new CommonAdministrativeAreaLevel3Zoom(itemCollection.zoom),
                new CommonAdministrativeAreaLevel3MapType(itemCollection.mapType),
                new CommonAdministrativeAreaLevel3CreatedAt(itemCollection.createdAt),
                new CommonAdministrativeAreaLevel3UpdatedAt(itemCollection.updatedAt),
                new CommonAdministrativeAreaLevel3DeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}