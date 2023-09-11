/* eslint-disable key-spacing */
import { CommonAdministrativeAreaLevel1 } from '@app/common/administrative-area-level-1';
import { CommonCreatedAdministrativeAreaLevel2Event, CommonDeletedAdministrativeAreaLevel2Event, CommonUpdatedAdministrativeAreaLevel2Event } from '@app/common/administrative-area-level-2';
import {
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2CreatedAt,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2DeletedAt,
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2UpdatedAt,
    CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommonCountry } from '@app/common/country';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class CommonAdministrativeAreaLevel2 extends AggregateRoot
{
    id: CommonAdministrativeAreaLevel2Id;
    countryId: CommonAdministrativeAreaLevel2CountryId;
    administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id;
    code: CommonAdministrativeAreaLevel2Code;
    customCode: CommonAdministrativeAreaLevel2CustomCode;
    name: CommonAdministrativeAreaLevel2Name;
    slug: CommonAdministrativeAreaLevel2Slug;
    latitude: CommonAdministrativeAreaLevel2Latitude;
    longitude: CommonAdministrativeAreaLevel2Longitude;
    zoom: CommonAdministrativeAreaLevel2Zoom;
    mapType: CommonAdministrativeAreaLevel2MapType;
    createdAt: CommonAdministrativeAreaLevel2CreatedAt;
    updatedAt: CommonAdministrativeAreaLevel2UpdatedAt;
    deletedAt: CommonAdministrativeAreaLevel2DeletedAt;
    country: CommonCountry;
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1;

    constructor(
        id: CommonAdministrativeAreaLevel2Id,
        countryId: CommonAdministrativeAreaLevel2CountryId,
        administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
        code: CommonAdministrativeAreaLevel2Code,
        customCode: CommonAdministrativeAreaLevel2CustomCode,
        name: CommonAdministrativeAreaLevel2Name,
        slug: CommonAdministrativeAreaLevel2Slug,
        latitude: CommonAdministrativeAreaLevel2Latitude,
        longitude: CommonAdministrativeAreaLevel2Longitude,
        zoom: CommonAdministrativeAreaLevel2Zoom,
        mapType: CommonAdministrativeAreaLevel2MapType,
        createdAt: CommonAdministrativeAreaLevel2CreatedAt,
        updatedAt: CommonAdministrativeAreaLevel2UpdatedAt,
        deletedAt: CommonAdministrativeAreaLevel2DeletedAt,
        country?: CommonCountry,
        administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
    )
    {
        super();
        this.id = id;
        this.countryId = countryId;
        this.administrativeAreaLevel1Id = administrativeAreaLevel1Id;
        this.code = code;
        this.customCode = customCode;
        this.name = name;
        this.slug = slug;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.mapType = mapType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.country = country;
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
    }

    static register(
        id: CommonAdministrativeAreaLevel2Id,
        countryId: CommonAdministrativeAreaLevel2CountryId,
        administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
        code: CommonAdministrativeAreaLevel2Code,
        customCode: CommonAdministrativeAreaLevel2CustomCode,
        name: CommonAdministrativeAreaLevel2Name,
        slug: CommonAdministrativeAreaLevel2Slug,
        latitude: CommonAdministrativeAreaLevel2Latitude,
        longitude: CommonAdministrativeAreaLevel2Longitude,
        zoom: CommonAdministrativeAreaLevel2Zoom,
        mapType: CommonAdministrativeAreaLevel2MapType,
        createdAt: CommonAdministrativeAreaLevel2CreatedAt,
        updatedAt: CommonAdministrativeAreaLevel2UpdatedAt,
        deletedAt: CommonAdministrativeAreaLevel2DeletedAt,
        country?: CommonCountry,
        administrativeAreaLevel1?: CommonAdministrativeAreaLevel1,
    ): CommonAdministrativeAreaLevel2
    {
        return new CommonAdministrativeAreaLevel2(
            id,
            countryId,
            administrativeAreaLevel1Id,
            code,
            customCode,
            name,
            slug,
            latitude,
            longitude,
            zoom,
            mapType,
            createdAt,
            updatedAt,
            deletedAt,
            country,
            administrativeAreaLevel1,
        );
    }

    created(administrativeAreaLevel2: CommonAdministrativeAreaLevel2): void
    {
        this.apply(
            new CommonCreatedAdministrativeAreaLevel2Event(
                administrativeAreaLevel2.id.value,
                administrativeAreaLevel2.countryId.value,
                administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                administrativeAreaLevel2.code.value,
                administrativeAreaLevel2.customCode?.value,
                administrativeAreaLevel2.name.value,
                administrativeAreaLevel2.slug.value,
                administrativeAreaLevel2.latitude?.value,
                administrativeAreaLevel2.longitude?.value,
                administrativeAreaLevel2.zoom?.value,
                administrativeAreaLevel2.mapType.value,
                administrativeAreaLevel2.createdAt?.value,
                administrativeAreaLevel2.updatedAt?.value,
                administrativeAreaLevel2.deletedAt?.value,
            ),
        );
    }

    updated(administrativeAreaLevel2: CommonAdministrativeAreaLevel2): void
    {
        this.apply(
            new CommonUpdatedAdministrativeAreaLevel2Event(
                administrativeAreaLevel2.id?.value,
                administrativeAreaLevel2.countryId?.value,
                administrativeAreaLevel2.administrativeAreaLevel1Id?.value,
                administrativeAreaLevel2.code?.value,
                administrativeAreaLevel2.customCode?.value,
                administrativeAreaLevel2.name?.value,
                administrativeAreaLevel2.slug?.value,
                administrativeAreaLevel2.latitude?.value,
                administrativeAreaLevel2.longitude?.value,
                administrativeAreaLevel2.zoom?.value,
                administrativeAreaLevel2.mapType?.value,
                administrativeAreaLevel2.createdAt?.value,
                administrativeAreaLevel2.updatedAt?.value,
                administrativeAreaLevel2.deletedAt?.value,
            ),
        );
    }

    deleted(administrativeAreaLevel2: CommonAdministrativeAreaLevel2): void
    {
        this.apply(
            new CommonDeletedAdministrativeAreaLevel2Event(
                administrativeAreaLevel2.id.value,
                administrativeAreaLevel2.countryId.value,
                administrativeAreaLevel2.administrativeAreaLevel1Id.value,
                administrativeAreaLevel2.code.value,
                administrativeAreaLevel2.customCode?.value,
                administrativeAreaLevel2.name.value,
                administrativeAreaLevel2.slug.value,
                administrativeAreaLevel2.latitude?.value,
                administrativeAreaLevel2.longitude?.value,
                administrativeAreaLevel2.zoom?.value,
                administrativeAreaLevel2.mapType.value,
                administrativeAreaLevel2.createdAt?.value,
                administrativeAreaLevel2.updatedAt?.value,
                administrativeAreaLevel2.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            countryId: this.countryId.value,
            administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
            code: this.code.value,
            customCode: this.customCode?.value,
            name: this.name.value,
            slug: this.slug.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            mapType: this.mapType.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            country: this.country?.toDTO(),
            administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            countryId: this.countryId.value,
            administrativeAreaLevel1Id: this.administrativeAreaLevel1Id.value,
            code: this.code.value,
            customCode: this.customCode?.value,
            name: this.name.value,
            slug: this.slug.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            mapType: this.mapType.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            country: this.country?.toDTO(),
            administrativeAreaLevel1: this.administrativeAreaLevel1?.toDTO(),
        };
    }
}
