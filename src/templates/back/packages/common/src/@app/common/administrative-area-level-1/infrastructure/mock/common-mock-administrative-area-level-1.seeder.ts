import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1Zoom,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1CreatedAt,
    CommonAdministrativeAreaLevel1UpdatedAt,
    CommonAdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';
import { CommonAdministrativeAreaLevel1 } from '../../domain/common-administrative-area-level-1.aggregate';
import { commonMockAdministrativeAreaLevel1Data } from './common-mock-administrative-area-level-1.data';
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