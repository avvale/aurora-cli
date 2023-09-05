import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2/domain/common-administrative-area-level-2.repository';
import {
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2Zoom,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2CreatedAt,
    CommonAdministrativeAreaLevel2UpdatedAt,
    CommonAdministrativeAreaLevel2DeletedAt,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommonAdministrativeAreaLevel2 } from '../../domain/common-administrative-area-level-2.aggregate';
import { commonMockAdministrativeAreaLevel2Data } from './common-mock-administrative-area-level-2.data';

@Injectable()
export class CommonMockAdministrativeAreaLevel2Repository extends MockRepository<CommonAdministrativeAreaLevel2> implements CommonIAdministrativeAreaLevel2Repository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'CommonAdministrativeAreaLevel2';
    public collectionSource: CommonAdministrativeAreaLevel2[];

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

        for (const itemCollection of <any[]>commonMockAdministrativeAreaLevel2Data)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(CommonAdministrativeAreaLevel2.register(
                new CommonAdministrativeAreaLevel2Id(itemCollection.id),
                new CommonAdministrativeAreaLevel2CountryId(itemCollection.countryId),
                new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(itemCollection.administrativeAreaLevel1Id),
                new CommonAdministrativeAreaLevel2Code(itemCollection.code),
                new CommonAdministrativeAreaLevel2CustomCode(itemCollection.customCode),
                new CommonAdministrativeAreaLevel2Name(itemCollection.name),
                new CommonAdministrativeAreaLevel2Slug(itemCollection.slug),
                new CommonAdministrativeAreaLevel2Latitude(itemCollection.latitude),
                new CommonAdministrativeAreaLevel2Longitude(itemCollection.longitude),
                new CommonAdministrativeAreaLevel2Zoom(itemCollection.zoom),
                new CommonAdministrativeAreaLevel2MapType(itemCollection.mapType),
                new CommonAdministrativeAreaLevel2CreatedAt(itemCollection.createdAt),
                new CommonAdministrativeAreaLevel2UpdatedAt(itemCollection.updatedAt),
                new CommonAdministrativeAreaLevel2DeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
