import { CommonAdministrativeAreaLevel1, commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import {
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1CreatedAt,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1DeletedAt,
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1UpdatedAt,
    CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAdministrativeAreaLevel1Seeder extends MockSeeder<CommonAdministrativeAreaLevel1>
{
    public collectionSource: CommonAdministrativeAreaLevel1[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const administrativeAreaLevel1 of _.orderBy(commonMockAdministrativeAreaLevel1Data, ['id']))
        {
            this.collectionSource.push(
                CommonAdministrativeAreaLevel1.register(
                    new CommonAdministrativeAreaLevel1Id(administrativeAreaLevel1.id),
                    new CommonAdministrativeAreaLevel1CountryId(administrativeAreaLevel1.countryId),
                    new CommonAdministrativeAreaLevel1Code(administrativeAreaLevel1.code),
                    new CommonAdministrativeAreaLevel1CustomCode(administrativeAreaLevel1.customCode),
                    new CommonAdministrativeAreaLevel1Name(administrativeAreaLevel1.name),
                    new CommonAdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug),
                    new CommonAdministrativeAreaLevel1Latitude(administrativeAreaLevel1.latitude),
                    new CommonAdministrativeAreaLevel1Longitude(administrativeAreaLevel1.longitude),
                    new CommonAdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom),
                    new CommonAdministrativeAreaLevel1MapType(administrativeAreaLevel1.mapType),
                    new CommonAdministrativeAreaLevel1CreatedAt({ currentTimestamp: true }),
                    new CommonAdministrativeAreaLevel1UpdatedAt({ currentTimestamp: true }),
                    new CommonAdministrativeAreaLevel1DeletedAt(null),
                ),
            );
        }
    }
}
