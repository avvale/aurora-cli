import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from '@aurorajs.dev/core';
import { CommonAdministrativeAreaLevel1 } from './administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Response } from './administrative-area-level-1.response';
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
import { CountryMapper } from '@app/common/country/domain/country.mapper';

export class AdministrativeAreaLevel1Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param administrativeAreaLevel1
     */
    mapModelToAggregate(administrativeAreaLevel1: LiteralObject, cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel1
    {
        if (!administrativeAreaLevel1) return;

        return this.makeAggregate(administrativeAreaLevel1, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param administrativeAreasLevel1
     */
    mapModelsToAggregates(administrativeAreasLevel1: LiteralObject[], cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel1[]
    {
        if (!Array.isArray(administrativeAreasLevel1)) return;

        return administrativeAreasLevel1.map(administrativeAreaLevel1  => this.makeAggregate(administrativeAreaLevel1, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param administrativeAreaLevel1
     */
    mapAggregateToResponse(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): AdministrativeAreaLevel1Response
    {
        return this.makeResponse(administrativeAreaLevel1);
    }

    /**
     * Map array of aggregates to array responses
     * @param administrativeAreasLevel1
     */
    mapAggregatesToResponses(administrativeAreasLevel1: CommonAdministrativeAreaLevel1[]): AdministrativeAreaLevel1Response[]
    {
        if (!Array.isArray(administrativeAreasLevel1)) return;

        return administrativeAreasLevel1.map(administrativeAreaLevel1 => this.makeResponse(administrativeAreaLevel1));
    }

    private makeAggregate(administrativeAreaLevel1: LiteralObject, cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel1
    {
        return CommonAdministrativeAreaLevel1.register(
            new AdministrativeAreaLevel1Id(administrativeAreaLevel1.id, { undefinable: true }),
            new AdministrativeAreaLevel1CountryId(administrativeAreaLevel1.countryId, { undefinable: true }),
            new AdministrativeAreaLevel1Code(administrativeAreaLevel1.code, { undefinable: true }),
            new AdministrativeAreaLevel1CustomCode(administrativeAreaLevel1.customCode, { undefinable: true }),
            new AdministrativeAreaLevel1Name(administrativeAreaLevel1.name, { undefinable: true }),
            new AdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug, { undefinable: true }),
            new AdministrativeAreaLevel1Latitude(administrativeAreaLevel1.latitude, { undefinable: true }),
            new AdministrativeAreaLevel1Longitude(administrativeAreaLevel1.longitude, { undefinable: true }),
            new AdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom, { undefinable: true }),
            new AdministrativeAreaLevel1CreatedAt(administrativeAreaLevel1.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AdministrativeAreaLevel1UpdatedAt(administrativeAreaLevel1.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AdministrativeAreaLevel1DeletedAt(administrativeAreaLevel1.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: true }).mapModelToAggregate(administrativeAreaLevel1.country) : undefined,
        );
    }

    private makeResponse(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): AdministrativeAreaLevel1Response
    {
        if (!administrativeAreaLevel1) return;

        return new AdministrativeAreaLevel1Response(
            administrativeAreaLevel1.id.value,
            administrativeAreaLevel1.countryId.value,
            administrativeAreaLevel1.code.value,
            administrativeAreaLevel1.customCode.value,
            administrativeAreaLevel1.name.value,
            administrativeAreaLevel1.slug.value,
            administrativeAreaLevel1.latitude.value,
            administrativeAreaLevel1.longitude.value,
            administrativeAreaLevel1.zoom.value,
            administrativeAreaLevel1.createdAt.value,
            administrativeAreaLevel1.updatedAt.value,
            administrativeAreaLevel1.deletedAt.value,
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: true }).mapAggregateToResponse(administrativeAreaLevel1.country) : undefined,
        );
    }
}