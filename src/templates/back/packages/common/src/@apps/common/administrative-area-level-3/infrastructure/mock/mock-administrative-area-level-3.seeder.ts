import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { CommonAdministrativeAreaLevel3 } from '../../domain/administrative-area-level-3.aggregate';
import { administrativeAreasLevel3 } from '../seeds/administrative-area-level-3.seed';
import * as _ from 'lodash';

@Injectable()
export class MockAdministrativeAreaLevel3Seeder extends MockSeeder<CommonAdministrativeAreaLevel3>
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

        for (const administrativeAreaLevel3 of _.orderBy(administrativeAreasLevel3, ['id']))
        {
            this.collectionSource.push(
                CommonAdministrativeAreaLevel3.register(
                    new AdministrativeAreaLevel3Id(administrativeAreaLevel3.id),
                    new AdministrativeAreaLevel3CountryId(administrativeAreaLevel3.countryId),
                    new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreaLevel3.administrativeAreaLevel1Id),
                    new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreaLevel3.administrativeAreaLevel2Id),
                    new AdministrativeAreaLevel3Code(administrativeAreaLevel3.code),
                    new AdministrativeAreaLevel3CustomCode(administrativeAreaLevel3.customCode),
                    new AdministrativeAreaLevel3Name(administrativeAreaLevel3.name),
                    new AdministrativeAreaLevel3Slug(administrativeAreaLevel3.slug),
                    new AdministrativeAreaLevel3Latitude(administrativeAreaLevel3.latitude),
                    new AdministrativeAreaLevel3Longitude(administrativeAreaLevel3.longitude),
                    new AdministrativeAreaLevel3Zoom(administrativeAreaLevel3.zoom),
                    new AdministrativeAreaLevel3CreatedAt({ currentTimestamp: true }),
                    new AdministrativeAreaLevel3UpdatedAt({ currentTimestamp: true }),
                    new AdministrativeAreaLevel3DeletedAt(null),
                ),
            );
        }
    }
}