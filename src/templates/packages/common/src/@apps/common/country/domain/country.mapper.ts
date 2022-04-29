import { IMapper, MapperOptions, ObjectLiteral, CQMetadata } from 'aurora-ts-core';
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
import { LangMapper } from '../../../../@apps/common/lang/domain/lang.mapper';

export class CountryMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param country
     */
    mapModelToAggregate(country: ObjectLiteral, cQMetadata?: CQMetadata): CommonCountry
    {
        if (!country) return;

        return this.makeAggregate(country, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param countries
     */
    mapModelsToAggregates(countries: ObjectLiteral[], cQMetadata?: CQMetadata): CommonCountry[]
    {
        if (!Array.isArray(countries)) return;

        return countries.map(country  => this.makeAggregate(country, cQMetadata));
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

    private makeAggregate(country: ObjectLiteral, cQMetadata?: CQMetadata): CommonCountry
    {
        return CommonCountry.register(
            new CountryId(country.id),
            new CountryIso3166Alpha2(country.iso3166Alpha2),
            new CountryIso3166Alpha3(country.iso3166Alpha3),
            new CountryIso3166Numeric(country.iso3166Numeric),
            new CountryCustomCode(country.customCode),
            new CountryPrefix(country.prefix),
            new CountryImage(country.image),
            new CountrySort(country.sort),
            new CountryAdministrativeAreas(country.administrativeAreas),
            new CountryLatitude(country.latitude),
            new CountryLongitude(country.longitude),
            new CountryZoom(country.zoom),
            new CountryDataLang(country.dataLang),
            new CountryCreatedAt(country.createdAt, {}, { addTimezone: cQMetadata?.timezone }),
            new CountryUpdatedAt(country.updatedAt, {}, { addTimezone: cQMetadata?.timezone }),
            new CountryDeletedAt(country.deletedAt, {}, { addTimezone: cQMetadata?.timezone }),
            new CountryI18NLangId(country.countryI18N.langId),
            new CountryI18NName(country.countryI18N.name),
            new CountryI18NSlug(country.countryI18N.slug),
            new CountryI18NAdministrativeAreaLevel1(country.countryI18N.administrativeAreaLevel1),
            new CountryI18NAdministrativeAreaLevel2(country.countryI18N.administrativeAreaLevel2),
            new CountryI18NAdministrativeAreaLevel3(country.countryI18N.administrativeAreaLevel3),
            this.options.eagerLoading ? new LangMapper({ eagerLoading: false }).mapModelToAggregate(country.countryI18N.lang) : undefined,
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
            country.dataLang.value,
            country.createdAt.value,
            country.updatedAt.value,
            country.deletedAt.value,
            country.langId.value,
            country.name.value,
            country.slug.value,
            country.administrativeAreaLevel1.value,
            country.administrativeAreaLevel2.value,
            country.administrativeAreaLevel3.value,
            this.options.eagerLoading ? new LangMapper({ eagerLoading: false }).mapAggregateToResponse(country.lang) : undefined,
        );
    }
}