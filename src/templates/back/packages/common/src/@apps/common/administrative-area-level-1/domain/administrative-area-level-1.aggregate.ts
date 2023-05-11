/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurorajs.dev/core';
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
} from './value-objects';
import { CreatedAdministrativeAreaLevel1Event } from '../application/events/created-administrative-area-level-1.event';
import { UpdatedAdministrativeAreaLevel1Event } from '../application/events/updated-administrative-area-level-1.event';
import { DeletedAdministrativeAreaLevel1Event } from '../application/events/deleted-administrative-area-level-1.event';
import { CommonCountry } from '@app/common/country/domain/country.aggregate';

export class CommonAdministrativeAreaLevel1 extends AggregateRoot
{
    id: AdministrativeAreaLevel1Id;
    countryId: AdministrativeAreaLevel1CountryId;
    code: AdministrativeAreaLevel1Code;
    customCode: AdministrativeAreaLevel1CustomCode;
    name: AdministrativeAreaLevel1Name;
    slug: AdministrativeAreaLevel1Slug;
    latitude: AdministrativeAreaLevel1Latitude;
    longitude: AdministrativeAreaLevel1Longitude;
    zoom: AdministrativeAreaLevel1Zoom;
    createdAt: AdministrativeAreaLevel1CreatedAt;
    updatedAt: AdministrativeAreaLevel1UpdatedAt;
    deletedAt: AdministrativeAreaLevel1DeletedAt;

    // eager relationship
    country: CommonCountry;

    constructor(
        id: AdministrativeAreaLevel1Id,
        countryId: AdministrativeAreaLevel1CountryId,
        code: AdministrativeAreaLevel1Code,
        customCode: AdministrativeAreaLevel1CustomCode,
        name: AdministrativeAreaLevel1Name,
        slug: AdministrativeAreaLevel1Slug,
        latitude: AdministrativeAreaLevel1Latitude,
        longitude: AdministrativeAreaLevel1Longitude,
        zoom: AdministrativeAreaLevel1Zoom,
        createdAt: AdministrativeAreaLevel1CreatedAt,
        updatedAt: AdministrativeAreaLevel1UpdatedAt,
        deletedAt: AdministrativeAreaLevel1DeletedAt,

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
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.country = country;
    }

    static register (
        id: AdministrativeAreaLevel1Id,
        countryId: AdministrativeAreaLevel1CountryId,
        code: AdministrativeAreaLevel1Code,
        customCode: AdministrativeAreaLevel1CustomCode,
        name: AdministrativeAreaLevel1Name,
        slug: AdministrativeAreaLevel1Slug,
        latitude: AdministrativeAreaLevel1Latitude,
        longitude: AdministrativeAreaLevel1Longitude,
        zoom: AdministrativeAreaLevel1Zoom,
        createdAt: AdministrativeAreaLevel1CreatedAt,
        updatedAt: AdministrativeAreaLevel1UpdatedAt,
        deletedAt: AdministrativeAreaLevel1DeletedAt,

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
            createdAt,
            updatedAt,
            deletedAt,

            country,
        );
    }

    created(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): void
    {
        this.apply(
            new CreatedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryId.value,
                administrativeAreaLevel1.code.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name.value,
                administrativeAreaLevel1.slug.value,
                administrativeAreaLevel1.latitude?.value,
                administrativeAreaLevel1.longitude?.value,
                administrativeAreaLevel1.zoom?.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            ),
        );
    }

    updated(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): void
    {
        this.apply(
            new UpdatedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id?.value,
                administrativeAreaLevel1.countryId?.value,
                administrativeAreaLevel1.code?.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name?.value,
                administrativeAreaLevel1.slug?.value,
                administrativeAreaLevel1.latitude?.value,
                administrativeAreaLevel1.longitude?.value,
                administrativeAreaLevel1.zoom?.value,
                administrativeAreaLevel1.createdAt?.value,
                administrativeAreaLevel1.updatedAt?.value,
                administrativeAreaLevel1.deletedAt?.value,
            ),
        );
    }

    deleted(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): void
    {
        this.apply(
            new DeletedAdministrativeAreaLevel1Event(
                administrativeAreaLevel1.id.value,
                administrativeAreaLevel1.countryId.value,
                administrativeAreaLevel1.code.value,
                administrativeAreaLevel1.customCode?.value,
                administrativeAreaLevel1.name.value,
                administrativeAreaLevel1.slug.value,
                administrativeAreaLevel1.latitude?.value,
                administrativeAreaLevel1.longitude?.value,
                administrativeAreaLevel1.zoom?.value,
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
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            country: this.country?.toDTO(),
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
