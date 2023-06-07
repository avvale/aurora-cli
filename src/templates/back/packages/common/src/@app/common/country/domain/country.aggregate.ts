/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from '@aurorajs.dev/core';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryMapType,
    CountryAvailableLangs,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18nLangId,
    CountryI18nName,
    CountryI18nSlug,
    CountryI18nAdministrativeAreaLevel1,
    CountryI18nAdministrativeAreaLevel2,
    CountryI18nAdministrativeAreaLevel3,
} from './value-objects';
import { CreatedCountryEvent } from '../application/events/created-country.event';
import { UpdatedCountryEvent } from '../application/events/updated-country.event';
import { DeletedCountryEvent } from '../application/events/deleted-country.event';
import { CommonLang } from '@app/common/lang/domain/lang.aggregate';

export class CommonCountry extends AggregateRoot
{
    id: CountryId;
    iso3166Alpha2: CountryIso3166Alpha2;
    iso3166Alpha3: CountryIso3166Alpha3;
    iso3166Numeric: CountryIso3166Numeric;
    customCode: CountryCustomCode;
    prefix: CountryPrefix;
    image: CountryImage;
    sort: CountrySort;
    administrativeAreas: CountryAdministrativeAreas;
    latitude: CountryLatitude;
    longitude: CountryLongitude;
    zoom: CountryZoom;
    mapType: CountryMapType;
    availableLangs: CountryAvailableLangs;
    createdAt: CountryCreatedAt;
    updatedAt: CountryUpdatedAt;
    deletedAt: CountryDeletedAt;
    langId: CountryI18nLangId;
    name: CountryI18nName;
    slug: CountryI18nSlug;
    administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1;
    administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2;
    administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3;

    // eager relationship
    lang: CommonLang;

    constructor(
        id: CountryId,
        iso3166Alpha2: CountryIso3166Alpha2,
        iso3166Alpha3: CountryIso3166Alpha3,
        iso3166Numeric: CountryIso3166Numeric,
        customCode: CountryCustomCode,
        prefix: CountryPrefix,
        image: CountryImage,
        sort: CountrySort,
        administrativeAreas: CountryAdministrativeAreas,
        latitude: CountryLatitude,
        longitude: CountryLongitude,
        zoom: CountryZoom,
        mapType: CountryMapType,
        availableLangs: CountryAvailableLangs,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
        langId: CountryI18nLangId,
        name: CountryI18nName,
        slug: CountryI18nSlug,
        administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1,
        administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2,
        administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3,

        lang?: CommonLang,
    )
    {
        super();
        this.id = id;
        this.iso3166Alpha2 = iso3166Alpha2;
        this.iso3166Alpha3 = iso3166Alpha3;
        this.iso3166Numeric = iso3166Numeric;
        this.customCode = customCode;
        this.prefix = prefix;
        this.image = image;
        this.sort = sort;
        this.administrativeAreas = administrativeAreas;
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
        this.mapType = mapType;
        this.availableLangs = availableLangs;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.langId = langId;
        this.name = name;
        this.slug = slug;
        this.administrativeAreaLevel1 = administrativeAreaLevel1;
        this.administrativeAreaLevel2 = administrativeAreaLevel2;
        this.administrativeAreaLevel3 = administrativeAreaLevel3;

        // eager relationship
        this.lang = lang;
    }

    static register (
        id: CountryId,
        iso3166Alpha2: CountryIso3166Alpha2,
        iso3166Alpha3: CountryIso3166Alpha3,
        iso3166Numeric: CountryIso3166Numeric,
        customCode: CountryCustomCode,
        prefix: CountryPrefix,
        image: CountryImage,
        sort: CountrySort,
        administrativeAreas: CountryAdministrativeAreas,
        latitude: CountryLatitude,
        longitude: CountryLongitude,
        zoom: CountryZoom,
        mapType: CountryMapType,
        availableLangs: CountryAvailableLangs,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
        langId: CountryI18nLangId,
        name: CountryI18nName,
        slug: CountryI18nSlug,
        administrativeAreaLevel1: CountryI18nAdministrativeAreaLevel1,
        administrativeAreaLevel2: CountryI18nAdministrativeAreaLevel2,
        administrativeAreaLevel3: CountryI18nAdministrativeAreaLevel3,

        lang?: CommonLang,
    ): CommonCountry
    {
        return new CommonCountry(
            id,
            iso3166Alpha2,
            iso3166Alpha3,
            iso3166Numeric,
            customCode,
            prefix,
            image,
            sort,
            administrativeAreas,
            latitude,
            longitude,
            zoom,
            mapType,
            availableLangs,
            createdAt,
            updatedAt,
            deletedAt,
            langId,
            name,
            slug,
            administrativeAreaLevel1,
            administrativeAreaLevel2,
            administrativeAreaLevel3,

            lang,
        );
    }

    created(country: CommonCountry): void
    {
        this.apply(
            new CreatedCountryEvent(
                country.id.value,
                country.iso3166Alpha2.value,
                country.iso3166Alpha3.value,
                country.iso3166Numeric.value,
                country.customCode?.value,
                country.prefix?.value,
                country.image?.value,
                country.sort?.value,
                country.administrativeAreas?.value,
                country.latitude?.value,
                country.longitude?.value,
                country.zoom?.value,
                country.mapType.value,
                country.availableLangs?.value,
                country.createdAt?.value,
                country.updatedAt?.value,
                country.deletedAt?.value,
                country.langId.value,
                country.name.value,
                country.slug.value,
                country.administrativeAreaLevel1?.value,
                country.administrativeAreaLevel2?.value,
                country.administrativeAreaLevel3?.value,
            ),
        );
    }

    updated(country: CommonCountry): void
    {
        this.apply(
            new UpdatedCountryEvent(
                country.id?.value,
                country.iso3166Alpha2?.value,
                country.iso3166Alpha3?.value,
                country.iso3166Numeric?.value,
                country.customCode?.value,
                country.prefix?.value,
                country.image?.value,
                country.sort?.value,
                country.administrativeAreas?.value,
                country.latitude?.value,
                country.longitude?.value,
                country.zoom?.value,
                country.mapType?.value,
                country.availableLangs?.value,
                country.createdAt?.value,
                country.updatedAt?.value,
                country.deletedAt?.value,
                country.langId?.value,
                country.name?.value,
                country.slug?.value,
                country.administrativeAreaLevel1?.value,
                country.administrativeAreaLevel2?.value,
                country.administrativeAreaLevel3?.value,
            ),
        );
    }

    deleted(country: CommonCountry): void
    {
        this.apply(
            new DeletedCountryEvent(
                country.id.value,
                country.iso3166Alpha2.value,
                country.iso3166Alpha3.value,
                country.iso3166Numeric.value,
                country.customCode?.value,
                country.prefix?.value,
                country.image?.value,
                country.sort?.value,
                country.administrativeAreas?.value,
                country.latitude?.value,
                country.longitude?.value,
                country.zoom?.value,
                country.mapType.value,
                country.availableLangs?.value,
                country.createdAt?.value,
                country.updatedAt?.value,
                country.deletedAt?.value,
                country.langId.value,
                country.name.value,
                country.slug.value,
                country.administrativeAreaLevel1?.value,
                country.administrativeAreaLevel2?.value,
                country.administrativeAreaLevel3?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            iso3166Alpha2: this.iso3166Alpha2.value,
            iso3166Alpha3: this.iso3166Alpha3.value,
            iso3166Numeric: this.iso3166Numeric.value,
            customCode: this.customCode?.value,
            prefix: this.prefix?.value,
            image: this.image?.value,
            sort: this.sort?.value,
            administrativeAreas: this.administrativeAreas?.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            mapType: this.mapType.value,
            availableLangs: this.availableLangs?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            langId: this.langId.value,
            name: this.name.value,
            slug: this.slug.value,
            administrativeAreaLevel1: this.administrativeAreaLevel1?.value,
            administrativeAreaLevel2: this.administrativeAreaLevel2?.value,
            administrativeAreaLevel3: this.administrativeAreaLevel3?.value,

            // eager relationship
            lang: this.lang?.toDTO(),
        };
    }

    toI18nDTO(): LiteralObject
    {
        return {
            id: Utils.uuid(),
            countryId: this.id.value,
            langId: this.langId.value,
            name: this.name.value,
            slug: this.slug.value,
            administrativeAreaLevel1: this.administrativeAreaLevel1?.value,
            administrativeAreaLevel2: this.administrativeAreaLevel2?.value,
            administrativeAreaLevel3: this.administrativeAreaLevel3?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            iso3166Alpha2: this.iso3166Alpha2.value,
            iso3166Alpha3: this.iso3166Alpha3.value,
            iso3166Numeric: this.iso3166Numeric.value,
            customCode: this.customCode?.value,
            prefix: this.prefix?.value,
            image: this.image?.value,
            sort: this.sort?.value,
            administrativeAreas: this.administrativeAreas?.value,
            latitude: this.latitude?.value,
            longitude: this.longitude?.value,
            zoom: this.zoom?.value,
            mapType: this.mapType.value,
            availableLangs: this.availableLangs?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            langId: this.langId.value,
            name: this.name.value,
            slug: this.slug.value,
            administrativeAreaLevel1: this.administrativeAreaLevel1?.value,
            administrativeAreaLevel2: this.administrativeAreaLevel2?.value,
            administrativeAreaLevel3: this.administrativeAreaLevel3?.value,

            // eager relationship
            lang: this.lang?.toDTO(),
        };
    }
}
