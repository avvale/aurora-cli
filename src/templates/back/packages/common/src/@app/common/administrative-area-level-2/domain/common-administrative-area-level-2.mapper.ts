import { CommonAdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2, CommonAdministrativeAreaLevel2Response } from '@app/common/administrative-area-level-2';
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
import { CommonCountryMapper } from '@app/common/country';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel2Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param administrativeAreaLevel2
     */
    mapModelToAggregate(administrativeAreaLevel2: LiteralObject, cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel2
    {
        if (!administrativeAreaLevel2) return;

        return this.makeAggregate(administrativeAreaLevel2, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param administrativeAreasLevel2
     */
    mapModelsToAggregates(administrativeAreasLevel2: LiteralObject[], cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel2[]
    {
        if (!Array.isArray(administrativeAreasLevel2)) return;

        return administrativeAreasLevel2.map(administrativeAreaLevel2 => this.makeAggregate(administrativeAreaLevel2, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param administrativeAreaLevel2
     */
    mapAggregateToResponse(administrativeAreaLevel2: CommonAdministrativeAreaLevel2): CommonAdministrativeAreaLevel2Response
    {
        return this.makeResponse(administrativeAreaLevel2);
    }

    /**
     * Map array of aggregates to array responses
     * @param administrativeAreasLevel2
     */
    mapAggregatesToResponses(administrativeAreasLevel2: CommonAdministrativeAreaLevel2[]): CommonAdministrativeAreaLevel2Response[]
    {
        if (!Array.isArray(administrativeAreasLevel2)) return;

        return administrativeAreasLevel2.map(administrativeAreaLevel2 => this.makeResponse(administrativeAreaLevel2));
    }

    private makeAggregate(administrativeAreaLevel2: LiteralObject, cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel2
    {
        return CommonAdministrativeAreaLevel2.register(
            new CommonAdministrativeAreaLevel2Id(administrativeAreaLevel2.id, { undefinable: true }),
            new CommonAdministrativeAreaLevel2CountryId(administrativeAreaLevel2.countryId, { undefinable: true }),
            new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreaLevel2.administrativeAreaLevel1Id, { undefinable: true }),
            new CommonAdministrativeAreaLevel2Code(administrativeAreaLevel2.code, { undefinable: true }),
            new CommonAdministrativeAreaLevel2CustomCode(administrativeAreaLevel2.customCode, { undefinable: true }),
            new CommonAdministrativeAreaLevel2Name(administrativeAreaLevel2.name, { undefinable: true }),
            new CommonAdministrativeAreaLevel2Slug(administrativeAreaLevel2.slug, { undefinable: true }),
            new CommonAdministrativeAreaLevel2Latitude(administrativeAreaLevel2.latitude, { undefinable: true }),
            new CommonAdministrativeAreaLevel2Longitude(administrativeAreaLevel2.longitude, { undefinable: true }),
            new CommonAdministrativeAreaLevel2Zoom(administrativeAreaLevel2.zoom, { undefinable: true }),
            new CommonAdministrativeAreaLevel2MapType(administrativeAreaLevel2.mapType, { undefinable: true }),
            new CommonAdministrativeAreaLevel2CreatedAt(administrativeAreaLevel2.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAdministrativeAreaLevel2UpdatedAt(administrativeAreaLevel2.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new CommonAdministrativeAreaLevel2DeletedAt(administrativeAreaLevel2.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new CommonCountryMapper({ eagerLoading: true }).mapModelToAggregate(administrativeAreaLevel2.country, cQMetadata) : undefined,
            this.options.eagerLoading ? new CommonAdministrativeAreaLevel1Mapper({ eagerLoading: true }).mapModelToAggregate(administrativeAreaLevel2.administrativeAreaLevel1, cQMetadata) : undefined,
        );
    }

    private makeResponse(administrativeAreaLevel2: CommonAdministrativeAreaLevel2): CommonAdministrativeAreaLevel2Response
    {
        if (!administrativeAreaLevel2) return;

        return new CommonAdministrativeAreaLevel2Response(
            administrativeAreaLevel2.id.value,
            administrativeAreaLevel2.countryId.value,
            administrativeAreaLevel2.administrativeAreaLevel1Id.value,
            administrativeAreaLevel2.code.value,
            administrativeAreaLevel2.customCode.value,
            administrativeAreaLevel2.name.value,
            administrativeAreaLevel2.slug.value,
            administrativeAreaLevel2.latitude.value,
            administrativeAreaLevel2.longitude.value,
            administrativeAreaLevel2.zoom.value,
            administrativeAreaLevel2.mapType.value,
            administrativeAreaLevel2.createdAt.value,
            administrativeAreaLevel2.updatedAt.value,
            administrativeAreaLevel2.deletedAt.value,
            this.options.eagerLoading ? new CommonCountryMapper({ eagerLoading: true }).mapAggregateToResponse(administrativeAreaLevel2.country) : undefined,
            this.options.eagerLoading ? new CommonAdministrativeAreaLevel1Mapper({ eagerLoading: true }).mapAggregateToResponse(administrativeAreaLevel2.administrativeAreaLevel1) : undefined,
        );
    }
}
