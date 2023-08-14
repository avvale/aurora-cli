import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { CommonAdministrativeAreaLevel3 } from '../../domain/common-administrative-area-level-3.aggregate';
import { commonMockAdministrativeAreaLevel3Data } from './common-mock-administrative-area-level-3.data';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAdministrativeAreaLevel3Seeder extends MockSeeder<CommonAdministrativeAreaLevel3>
{
    public collectionSource: CommonAdministrativeAreaLevel3[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const administrativeAreaLevel3 of _.orderBy(commonMockAdministrativeAreaLevel3Data, ['id']))
        {
            this.collectionSource.push(
                CommonAdministrativeAreaLevel3.register(
                    new CommonAdministrativeAreaLevel3Id(administrativeAreaLevel3.id),
                    new CommonAdministrativeAreaLevel3CountryId(administrativeAreaLevel3.countryId),
                    new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreaLevel3.administrativeAreaLevel1Id),
                    new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreaLevel3.administrativeAreaLevel2Id),
                    new CommonAdministrativeAreaLevel3Code(administrativeAreaLevel3.code),
                    new CommonAdministrativeAreaLevel3CustomCode(administrativeAreaLevel3.customCode),
                    new CommonAdministrativeAreaLevel3Name(administrativeAreaLevel3.name),
                    new CommonAdministrativeAreaLevel3Slug(administrativeAreaLevel3.slug),
                    new CommonAdministrativeAreaLevel3Latitude(administrativeAreaLevel3.latitude),
                    new CommonAdministrativeAreaLevel3Longitude(administrativeAreaLevel3.longitude),
                    new CommonAdministrativeAreaLevel3Zoom(administrativeAreaLevel3.zoom),
                    new CommonAdministrativeAreaLevel3MapType(administrativeAreaLevel3.mapType),
                    new CommonAdministrativeAreaLevel3CreatedAt({ currentTimestamp: true }),
                    new CommonAdministrativeAreaLevel3UpdatedAt({ currentTimestamp: true }),
                    new CommonAdministrativeAreaLevel3DeletedAt(null),
                ),
            );
        }
    }
}
