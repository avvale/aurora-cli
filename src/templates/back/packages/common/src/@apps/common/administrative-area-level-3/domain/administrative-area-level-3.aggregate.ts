/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { CreatedAdministrativeAreaLevel3Event } from '../application/events/created-administrative-area-level-3.event';
import { UpdatedAdministrativeAreaLevel3Event } from '../application/events/updated-administrative-area-level-3.event';
import { DeletedAdministrativeAreaLevel3Event } from '../application/events/deleted-administrative-area-level-3.event';
import { CommonCountry } from '@app/common/country/domain/country.aggregate';
import { CommonAdministrativeAreaLevel1 } from '@app/common/administrative-area-level-1/domain/administrative-area-level-1.aggregate';
import { CommonAdministrativeAreaLevel2 } from '@app/common/administrative-area-level-2/domain/administrative-area-level-2.aggregate';

export class CommonAdministrativeAreaLevel3 extends AggregateRoot
{
    id: AdministrativeAreaLevel3Id;
    countryId: AdministrativeAreaLevel3CountryId;
    administrativeAreaLevel1Id: AdministrativeAreaLevel3AdministrativeAreaLevel1Id;
    administrativeAreaLevel2Id: AdministrativeAreaLevel3AdministrativeAreaLevel2Id;
    code: AdministrativeAreaLevel3Code;
    customCode: AdministrativeAreaLevel3CustomCode;
    name: AdministrativeAreaLevel3Name;
    slug: AdministrativeAreaLevel3Slug;
    latitude: AdministrativeAreaLevel3Latitude;
    longitude: AdministrativeAreaLevel3Longitude;
    zoom: AdministrativeAreaLevel3Zoom;
    createdAt: AdministrativeAreaLevel3CreatedAt;
    updatedAt: AdministrativeAreaLevel3UpdatedAt;
    deletedAt: AdministrativeAreaLevel3DeletedAt;

    // eager relationship
    country: CommonCountry;
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1;
    administrativeAreaLevel2: CommonAdministrativeAreaLevel2;

    constructor(
        id: AdministrativeAreaLevel3Id,
        countryId: AdministrativeAreaLevel3CountryId,
        administrativeAreaLevel1Id: AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
        administrativeAreaLevel2Id: AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
        code: AdministrativeAreaLevel3Code,
        customCode: AdministrativeAreaLevel3CustomCode,
        name: AdministrativeAreaLevel3Name,
        slug: AdministrativeAreaLevel3Slug,
        latitude: AdministrativeAreaLevel3Latitude,
        longitude: AdministrativeAreaLevel3Longitude,
        zoom: AdministrativeAreaLevel3Zoom,
        createdAt: AdministrativeAreaLevel3CreatedAt,
        updatedAt: AdministrativeAreaLevel3UpdatedAt,
        deletedAt: AdministrativeAreaLevel3DeletedAt,

        country?: CommonCountry,
        administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
        administrativeAreaLevel2?: CommonAdministrativeAreaLevel2,
    )
    {
        super();
        this.id = id;
        this.countryId = countryId;
        this.administrativeAreaLevel1Id = administrativeAreaLevel1Id;
        this.administrativeAreaLevel2Id = administrativeAreaLevel2Id;
        this.code = code;
        this.customCode = customCode;
        this.name = name;
        this.slug = slug;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.country = country;
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
        this.administrativeAreaLevel2 = administrativeAreaLevel2;
    }

    static register (
        id: AdministrativeAreaLevel3Id,
        countryId: AdministrativeAreaLevel3CountryId,
        administrativeAreaLevel1Id: AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
        administrativeAreaLevel2Id: AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
        code: AdministrativeAreaLevel3Code,
        customCode: AdministrativeAreaLevel3CustomCode,
        name: AdministrativeAreaLevel3Name,
        slug: AdministrativeAreaLevel3Slug,
        latitude: AdministrativeAreaLevel3Latitude,
        longitude: AdministrativeAreaLevel3Longitude,
        zoom: AdministrativeAreaLevel3Zoom,
        createdAt: AdministrativeAreaLevel3CreatedAt,
        updatedAt: AdministrativeAreaLevel3UpdatedAt,
        deletedAt: AdministrativeAreaLevel3DeletedAt,

        country?: CommonCountry,
        administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
        administrativeAreaLevel2?: CommonAdministrativeAreaLevel2,
    ): CommonAdministrativeAreaLevel3
    {
        return new CommonAdministrativeAreaLevel3(
            id,
            countryId,
            administrativeAreaLevel1Id,
            administrativeAreaLevel2Id,
            code,
            customCode,
            name,
            slug,
            latitude,
            longitude,
            zoom,
            createdAt,
            updatedAt,
            deletedAt,

            country,
            administrativeAreaLevel1,
            administrativeAreaLevel2,
        );
    }

    created(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): void
    {
        this.apply(
            new CreatedAdministrativeAreaLevel3Event(
                administrativeAreaLevel3.id.value,
                administrativeAreaLevel3.countryId.value,
                administrativeAreaLevel3.administrativeAreaLevel1Id.value,
                administrativeAreaLevel3.administrativeAreaLevel2Id.value,
                administrativeAreaLevel3.code.value,
                administrativeAreaLevel3.customCode?.value,
                administrativeAreaLevel3.name.value,
                administrativeAreaLevel3.slug.value,
                administrativeAreaLevel3.latitude?.value,
                administrativeAreaLevel3.longitude?.value,
                administrativeAreaLevel3.zoom?.value,
                administrativeAreaLevel3.createdAt?.value,
                administrativeAreaLevel3.updatedAt?.value,
                administrativeAreaLevel3.deletedAt?.value,
            ),
        );
    }

    updated(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): void
    {
        this.apply(
            new UpdatedAdministrativeAreaLevel3Event(
                administrativeAreaLevel3.id?.value,
                administrativeAreaLevel3.countryId?.value,
                administrativeAreaLevel3.administrativeAreaLevel1Id?.value,
                administrativeAreaLevel3.administrativeAreaLevel2Id?.value,
                administrativeAreaLevel3.code?.value,
                administrativeAreaLevel3.customCode?.value,
                administrativeAreaLevel3.name?.value,
                administrativeAreaLevel3.slug?.value,
                administrativeAreaLevel3.latitude?.value,
                administrativeAreaLevel3.longitude?.value,
                administrativeAreaLevel3.zoom?.value,
                administrativeAreaLevel3.createdAt?.value,
                administrativeAreaLevel3.updatedAt?.value,
                administrativeAreaLevel3.deletedAt?.value,
            ),
        );
    }

    deleted(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): void
    {
        this.apply(
            new DeletedAdministrativeAreaLevel3Event(
                administrativeAreaLevel3.id.value,
                administrativeAreaLevel3.countryId.value,
                administrativeAreaLevel3.administrativeAreaLevel1Id.value,
                administrativeAreaLevel3.administrativeAreaLevel2Id.value,
                administrativeAreaLevel3.code.value,
                administrativeAreaLevel3.customCode?.value,
                administrativeAreaLevel3.name.value,
                administrativeAreaLevel3.slug.value,
                administrativeAreaLevel3.latitude?.value,
                administrativeAreaLevel3.longitude?.value,
                administrativeAreaLevel3.zoom?.value,
                administrativeAreaLevel3.createdAt?.value,
                administrativeAreaLevel3.updatedAt?.value,
                administrativeAreaLevel3.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            countryId: this.countryId.value,
            administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
            administrativeAreaLevel2Id: this.administrativeAreaLevel2Id.value,
            code: this.code.value,
            customCode: this.customCode?.value,
            name: this.name.value,
            slug: this.slug.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            country: this.country?.toDTO(),
            administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
            administrativeAreaLevel2: this.administrativeAreaLevel2?.toDTO(),
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
