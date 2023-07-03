/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { CommonCreatedAdministrativeAreaLevel1Event } from '../application/events/common-created-administrative-area-level-1.event';
import { CommonUpdatedAdministrativeAreaLevel1Event } from '../application/events/common-updated-administrative-area-level-1.event';
import { CommonDeletedAdministrativeAreaLevel1Event } from '../application/events/common-deleted-administrative-area-level-1.event';
import { CommonCountry } from '@app/common/country';

export class CommonAdministrativeAreaLevel1 extends AggregateRoot
{
    id: CommonAdministrativeAreaLevel1Id;
    countryId: CommonAdministrativeAreaLevel1CountryId;
    code: CommonAdministrativeAreaLevel1Code;
    customCode: CommonAdministrativeAreaLevel1CustomCode;
    name: CommonAdministrativeAreaLevel1Name;
    slug: CommonAdministrativeAreaLevel1Slug;
    latitude: CommonAdministrativeAreaLevel1Latitude;
    longitude: CommonAdministrativeAreaLevel1Longitude;
    zoom: CommonAdministrativeAreaLevel1Zoom;
    mapType: CommonAdministrativeAreaLevel1MapType;
    createdAt: CommonAdministrativeAreaLevel1CreatedAt;
    updatedAt: CommonAdministrativeAreaLevel1UpdatedAt;
    deletedAt: CommonAdministrativeAreaLevel1DeletedAt;

    // eager relationship
    country: CommonCountry;

    constructor(
        id: CommonAdministrativeAreaLevel1Id,
        countryId: CommonAdministrativeAreaLevel1CountryId,
        code: CommonAdministrativeAreaLevel1Code,
        customCode: CommonAdministrativeAreaLevel1CustomCode,
        name: CommonAdministrativeAreaLevel1Name,
        slug: CommonAdministrativeAreaLevel1Slug,
        latitude: CommonAdministrativeAreaLevel1Latitude,
        longitude: CommonAdministrativeAreaLevel1Longitude,
        zoom: CommonAdministrativeAreaLevel1Zoom,
        mapType: CommonAdministrativeAreaLevel1MapType,
        createdAt: CommonAdministrativeAreaLevel1CreatedAt,
        updatedAt: CommonAdministrativeAreaLevel1UpdatedAt,
        deletedAt: CommonAdministrativeAreaLevel1DeletedAt,

        country?: CommonCountry,
    )
    {
        super();
        this.id = id;
        this.countryId = countryId;
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

        // eager relationship
        this.country = country;
    }

    static register (
        id: CommonAdministrativeAreaLevel1Id,
        countryId: CommonAdministrativeAreaLevel1CountryId,
        code: CommonAdministrativeAreaLevel1Code,
        customCode: CommonAdministrativeAreaLevel1CustomCode,
        name: CommonAdministrativeAreaLevel1Name,
        slug: CommonAdministrativeAreaLevel1Slug,
        latitude: CommonAdministrativeAreaLevel1Latitude,
        longitude: CommonAdministrativeAreaLevel1Longitude,
        zoom: CommonAdministrativeAreaLevel1Zoom,
        mapType: CommonAdministrativeAreaLevel1MapType,
        createdAt: CommonAdministrativeAreaLevel1CreatedAt,
        updatedAt: CommonAdministrativeAreaLevel1UpdatedAt,
        deletedAt: CommonAdministrativeAreaLevel1DeletedAt,

        country?: CommonCountry,
    ): CommonAdministrativeAreaLevel1
    {
        return new CommonAdministrativeAreaLevel1(
            id,
            countryId,
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
        );
    }

    created(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): void
    {
        this.apply(
            new CommonCreatedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryId.value,
                administrativeAreaLevel1.code.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name.value,
                administrativeAreaLevel1.slug.value,
                administrativeAreaLevel1.latitude?.value,
                administrativeAreaLevel1.longitude?.value,
                administrativeAreaLevel1.zoom?.value,
                administrativeAreaLevel1.mapType.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            ),
        );
    }

    updated(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): void
    {
        this.apply(
            new CommonUpdatedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id?.value,
                administrativeAreaLevel1.countryId?.value,
                administrativeAreaLevel1.code?.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name?.value,
                administrativeAreaLevel1.slug?.value,
                administrativeAreaLevel1.latitude?.value,
                administrativeAreaLevel1.longitude?.value,
                administrativeAreaLevel1.zoom?.value,
                administrativeAreaLevel1.mapType?.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            ),
        );
    }

    deleted(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): void
    {
        this.apply(
            new CommonDeletedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryId.value,
                administrativeAreaLevel1.code.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name.value,
                administrativeAreaLevel1.slug.value,
                administrativeAreaLevel1.latitude?.value,
                administrativeAreaLevel1.longitude?.value,
                administrativeAreaLevel1.zoom?.value,
                administrativeAreaLevel1.mapType.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            countryId: this.countryId.value,
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

            // eager relationship
            country: this.country?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            countryId: this.countryId.value,
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

            // eager relationship
            country: this.country?.toDTO(),
        };
    }
}
