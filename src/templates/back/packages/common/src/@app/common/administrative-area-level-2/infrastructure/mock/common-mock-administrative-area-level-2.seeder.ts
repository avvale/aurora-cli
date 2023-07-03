import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { CommonAdministrativeAreaLevel2 } from '../../domain/common-administrative-area-level-2.aggregate';
import { commonMockAdministrativeAreaLevel2Data } from './common-mock-administrative-area-level-2.data';
import * as _ from 'lodash';

@Injectable()
export class CommonMockAdministrativeAreaLevel2Seeder extends MockSeeder<CommonAdministrativeAreaLevel2>
{
    public collectionSource: CommonAdministrativeAreaLevel2[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const administrativeAreaLevel2 of _.orderBy(commonMockAdministrativeAreaLevel2Data, ['id']))
        {
            this.collectionSource.push(
                CommonAdministrativeAreaLevel2.register(
                    new CommonAdministrativeAreaLevel2Id(administrativeAreaLevel2.id),
                    new CommonAdministrativeAreaLevel2CountryId(administrativeAreaLevel2.countryId),
                    new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreaLevel2.administrativeAreaLevel1Id),
                    new CommonAdministrativeAreaLevel2Code(administrativeAreaLevel2.code),
                    new CommonAdministrativeAreaLevel2CustomCode(administrativeAreaLevel2.customCode),
                    new CommonAdministrativeAreaLevel2Name(administrativeAreaLevel2.name),
                    new CommonAdministrativeAreaLevel2Slug(administrativeAreaLevel2.slug),
                    new CommonAdministrativeAreaLevel2Latitude(administrativeAreaLevel2.latitude),
                    new CommonAdministrativeAreaLevel2Longitude(administrativeAreaLevel2.longitude),
                    new CommonAdministrativeAreaLevel2Zoom(administrativeAreaLevel2.zoom),
                    new CommonAdministrativeAreaLevel2MapType(administrativeAreaLevel2.mapType),
                    new CommonAdministrativeAreaLevel2CreatedAt({ currentTimestamp: true }),
                    new CommonAdministrativeAreaLevel2UpdatedAt({ currentTimestamp: true }),
                    new CommonAdministrativeAreaLevel2DeletedAt(null),
                ),
            );
        }
    }
}