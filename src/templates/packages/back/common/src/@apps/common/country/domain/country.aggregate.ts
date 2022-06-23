/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
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
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18NLangId,
    CountryI18NName,
    CountryI18NSlug,
    CountryI18NAdministrativeAreaLevel1,
    CountryI18NAdministrativeAreaLevel2,
    CountryI18NAdministrativeAreaLevel3,
} from './value-objects';
import { CreatedCountryEvent } from '../application/events/created-country.event';
import { UpdatedCountryEvent } from '../application/events/updated-country.event';
import { DeletedCountryEvent } from '../application/events/deleted-country.event';
import { CommonLang } from '@apps/common/lang/domain/lang.aggregate';

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
    dataLang: CountryDataLang;
    createdAt: CountryCreatedAt;
    updatedAt: CountryUpdatedAt;
    deletedAt: CountryDeletedAt;
    langId: CountryI18NLangId;
    name: CountryI18NName;
    slug: CountryI18NSlug;
    administrativeAreaLevel1: CountryI18NAdministrativeAreaLevel1;
    administrativeAreaLevel2: CountryI18NAdministrativeAreaLevel2;
    administrativeAreaLevel3: CountryI18NAdministrativeAreaLevel3;

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
        dataLang: CountryDataLang,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
        langId: CountryI18NLangId,
        name: CountryI18NName,
        slug: CountryI18NSlug,
        administrativeAreaLevel1: CountryI18NAdministrativeAreaLevel1,
        administrativeAreaLevel2: CountryI18NAdministrativeAreaLevel2,
        administrativeAreaLevel3: CountryI18NAdministrativeAreaLevel3,

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
        this.dataLang = dataLang;
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
        dataLang: CountryDataLang,
        createdAt: CountryCreatedAt,
        updatedAt: CountryUpdatedAt,
        deletedAt: CountryDeletedAt,
        langId: CountryI18NLangId,
        name: CountryI18NName,
        slug: CountryI18NSlug,
        administrativeAreaLevel1: CountryI18NAdministrativeAreaLevel1,
        administrativeAreaLevel2: CountryI18NAdministrativeAreaLevel2,
        administrativeAreaLevel3: CountryI18NAdministrativeAreaLevel3,

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
            dataLang,
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
                country.dataLang?.value,
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
                country.dataLang?.value,
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
                country.dataLang?.value,
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
            dataLang: this.dataLang?.value,
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
}
