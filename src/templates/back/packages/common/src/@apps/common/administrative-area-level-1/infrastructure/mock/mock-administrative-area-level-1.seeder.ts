import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';
import { CommonAdministrativeAreaLevel1 } from '../../domain/administrative-area-level-1.aggregate';
import { administrativeAreasLevel1 } from '../seeds/administrative-area-level-1.seed';
import * as _ from 'lodash';

@Injectable()
export class MockAdministrativeAreaLevel1Seeder extends MockSeeder<CommonAdministrativeAreaLevel1>
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

        for (const administrativeAreaLevel1 of _.orderBy(administrativeAreasLevel1, ['id']))
        {
            this.collectionSource.push(
                CommonAdministrativeAreaLevel1.register(
                    new AdministrativeAreaLevel1Id(administrativeAreaLevel1.id),
                    new AdministrativeAreaLevel1CountryId(administrativeAreaLevel1.countryId),
                    new AdministrativeAreaLevel1Code(administrativeAreaLevel1.code),
                    new AdministrativeAreaLevel1CustomCode(administrativeAreaLevel1.customCode),
                    new AdministrativeAreaLevel1Name(administrativeAreaLevel1.name),
                    new AdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug),
                    new AdministrativeAreaLevel1Latitude(administrativeAreaLevel1.latitude),
                    new AdministrativeAreaLevel1Longitude(administrativeAreaLevel1.longitude),
                    new AdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom),
                    new AdministrativeAreaLevel1CreatedAt({ currentTimestamp: true }),
                    new AdministrativeAreaLevel1UpdatedAt({ currentTimestamp: true }),
                    new AdministrativeAreaLevel1DeletedAt(null),
                ),
            );
        }
    }
}