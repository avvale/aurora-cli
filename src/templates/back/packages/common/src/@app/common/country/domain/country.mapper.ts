import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { CommonCountry } from './country.aggregate';
import { CountryResponse } from './country.response';
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
import { LangMapper } from '@app/common/lang/domain/lang.mapper';

export class CountryMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param country
     */
    mapModelToAggregate(country: LiteralObject, cQMetadata?: CQMetadata): CommonCountry
    {
        if (!country) return;

        return this.makeAggregate(country, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param countries
     */
    mapModelsToAggregates(countries: LiteralObject[], cQMetadata?: CQMetadata): CommonCountry[]
    {
        if (!Array.isArray(countries)) return;

        return countries.map(country => this.makeAggregate(country, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param country
     */
    mapAggregateToResponse(country: CommonCountry): CountryResponse
    {
        return this.makeResponse(country);
    }

    /**
     * Map array of aggregates to array responses
     * @param countries
     */
    mapAggregatesToResponses(countries: CommonCountry[]): CountryResponse[]
    {
        if (!Array.isArray(countries)) return;

        return countries.map(country => this.makeResponse(country));
    }

    private makeAggregate(country: LiteralObject, cQMetadata?: CQMetadata): CommonCountry
    {
        return CommonCountry.register(
            new CountryId(country.id, { undefinable: true }),
            new CountryIso3166Alpha2(country.iso3166Alpha2, { undefinable: true }),
            new CountryIso3166Alpha3(country.iso3166Alpha3, { undefinable: true }),
            new CountryIso3166Numeric(country.iso3166Numeric, { undefinable: true }),
            new CountryCustomCode(country.customCode, { undefinable: true }),
            new CountryPrefix(country.prefix, { undefinable: true }),
            new CountryImage(country.image, { undefinable: true }),
            new CountrySort(country.sort, { undefinable: true }),
            new CountryAdministrativeAreas(country.administrativeAreas, { undefinable: true }),
            new CountryLatitude(country.latitude, { undefinable: true }),
            new CountryLongitude(country.longitude, { undefinable: true }),
            new CountryZoom(country.zoom, { undefinable: true }),
            new CountryMapType(country.mapType, { undefinable: true }),
            new CountryAvailableLangs(country.availableLangs, { undefinable: true }),
            new CountryCreatedAt(country.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CountryUpdatedAt(country.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CountryDeletedAt(country.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CountryI18nLangId(country.countryI18n.langId, { undefinable: true }),
            new CountryI18nName(country.countryI18n.name, { undefinable: true }),
            new CountryI18nSlug(country.countryI18n.slug, { undefinable: true }),
            new CountryI18nAdministrativeAreaLevel1(country.countryI18n.administrativeAreaLevel1, { undefinable: true }),
            new CountryI18nAdministrativeAreaLevel2(country.countryI18n.administrativeAreaLevel2, { undefinable: true }),
            new CountryI18nAdministrativeAreaLevel3(country.countryI18n.administrativeAreaLevel3, { undefinable: true }),
            this.options.eagerLoading ? new LangMapper({ eagerLoading: true }).mapModelToAggregate(country.countryI18n.lang, cQMetadata) : undefined,
        );
    }

    private makeResponse(country: CommonCountry): CountryResponse
    {
        if (!country) return;

        return new CountryResponse(
            country.id.value,
            country.iso3166Alpha2.value,
            country.iso3166Alpha3.value,
            country.iso3166Numeric.value,
            country.customCode.value,
            country.prefix.value,
            country.image.value,
            country.sort.value,
            country.administrativeAreas.value,
            country.latitude.value,
            country.longitude.value,
            country.zoom.value,
            country.mapType.value,
            country.availableLangs.value,
            country.createdAt.value,
            country.updatedAt.value,
            country.deletedAt.value,
            country.langId.value,
            country.name.value,
            country.slug.value,
            country.administrativeAreaLevel1.value,
            country.administrativeAreaLevel2.value,
            country.administrativeAreaLevel3.value,
            this.options.eagerLoading ? new LangMapper({ eagerLoading: true }).mapAggregateToResponse(country.lang) : undefined,
        );
    }
}