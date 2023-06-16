import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { CommonCountry } from './common-country.aggregate';
import { CommonCountryResponse } from './common-country.response';
import {
    CommonCountryId,
    CommonCountryIso3166Alpha2,
    CommonCountryIso3166Alpha3,
    CommonCountryIso3166Numeric,
    CommonCountryCustomCode,
    CommonCountryPrefix,
    CommonCountryImage,
    CommonCountrySort,
    CommonCountryAdministrativeAreas,
    CommonCountryLatitude,
    CommonCountryLongitude,
    CommonCountryZoom,
    CommonCountryMapType,
    CommonCountryAvailableLangs,
    CommonCountryCreatedAt,
    CommonCountryUpdatedAt,
    CommonCountryDeletedAt,
    CommonCountryI18nLangId,
    CommonCountryI18nName,
    CommonCountryI18nSlug,
    CommonCountryI18nAdministrativeAreaLevel1,
    CommonCountryI18nAdministrativeAreaLevel2,
    CommonCountryI18nAdministrativeAreaLevel3,
} from './value-objects';
import { CommonLangMapper } from '@app/common/lang';

export class CommonCountryMapper implements IMapper
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
    mapAggregateToResponse(country: CommonCountry): CommonCountryResponse
    {
        return this.makeResponse(country);
    }

    /**
     * Map array of aggregates to array responses
     * @param countries
     */
    mapAggregatesToResponses(countries: CommonCountry[]): CommonCountryResponse[]
    {
        if (!Array.isArray(countries)) return;

        return countries.map(country => this.makeResponse(country));
    }

    private makeAggregate(country: LiteralObject, cQMetadata?: CQMetadata): CommonCountry
    {
        return CommonCountry.register(
            new CommonCountryId(country.id, { undefinable: true }),
            new CommonCountryIso3166Alpha2(country.iso3166Alpha2, { undefinable: true }),
            new CommonCountryIso3166Alpha3(country.iso3166Alpha3, { undefinable: true }),
            new CommonCountryIso3166Numeric(country.iso3166Numeric, { undefinable: true }),
            new CommonCountryCustomCode(country.customCode, { undefinable: true }),
            new CommonCountryPrefix(country.prefix, { undefinable: true }),
            new CommonCountryImage(country.image, { undefinable: true }),
            new CommonCountrySort(country.sort, { undefinable: true }),
            new CommonCountryAdministrativeAreas(country.administrativeAreas, { undefinable: true }),
            new CommonCountryLatitude(country.latitude, { undefinable: true }),
            new CommonCountryLongitude(country.longitude, { undefinable: true }),
            new CommonCountryZoom(country.zoom, { undefinable: true }),
            new CommonCountryMapType(country.mapType, { undefinable: true }),
            new CommonCountryAvailableLangs(country.availableLangs, { undefinable: true }),
            new CommonCountryCreatedAt(country.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonCountryUpdatedAt(country.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonCountryDeletedAt(country.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonCountryI18nLangId(country.countryI18n.langId, { undefinable: true }),
            new CommonCountryI18nName(country.countryI18n.name, { undefinable: true }),
            new CommonCountryI18nSlug(country.countryI18n.slug, { undefinable: true }),
            new CommonCountryI18nAdministrativeAreaLevel1(country.countryI18n.administrativeAreaLevel1, { undefinable: true }),
            new CommonCountryI18nAdministrativeAreaLevel2(country.countryI18n.administrativeAreaLevel2, { undefinable: true }),
            new CommonCountryI18nAdministrativeAreaLevel3(country.countryI18n.administrativeAreaLevel3, { undefinable: true }),
            this.options.eagerLoading ? new CommonLangMapper({ eagerLoading: true }).mapModelToAggregate(country.countryI18n.lang, cQMetadata) : undefined,
        );
    }

    private makeResponse(country: CommonCountry): CommonCountryResponse
    {
        if (!country) return;

        return new CommonCountryResponse(
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
            this.options.eagerLoading ? new CommonLangMapper({ eagerLoading: true }).mapAggregateToResponse(country.lang) : undefined,
        );
    }
}