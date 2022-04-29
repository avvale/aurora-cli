import { IMapper, MapperOptions, ObjectLiteral, CQMetadata } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel3 } from './administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Response } from './administrative-area-level-3.response';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from './value-objects';
import { CountryMapper } from '../../../../@apps/common/country/domain/country.mapper';
import { AdministrativeAreaLevel1Mapper } from '../../../../@apps/common/administrative-area-level-1/domain/administrative-area-level-1.mapper';
import { AdministrativeAreaLevel2Mapper } from '../../../../@apps/common/administrative-area-level-2/domain/administrative-area-level-2.mapper';

export class AdministrativeAreaLevel3Mapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param administrativeAreaLevel3
     */
    mapModelToAggregate(administrativeAreaLevel3: ObjectLiteral, cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel3
    {
        if (!administrativeAreaLevel3) return;

        return this.makeAggregate(administrativeAreaLevel3, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param administrativeAreasLevel3
     */
    mapModelsToAggregates(administrativeAreasLevel3: ObjectLiteral[], cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel3[]
    {
        if (!Array.isArray(administrativeAreasLevel3)) return;

        return administrativeAreasLevel3.map(administrativeAreaLevel3  => this.makeAggregate(administrativeAreaLevel3, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param administrativeAreaLevel3
     */
    mapAggregateToResponse(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): AdministrativeAreaLevel3Response
    {
        return this.makeResponse(administrativeAreaLevel3);
    }

    /**
     * Map array of aggregates to array responses
     * @param administrativeAreasLevel3
     */
    mapAggregatesToResponses(administrativeAreasLevel3: CommonAdministrativeAreaLevel3[]): AdministrativeAreaLevel3Response[]
    {
        if (!Array.isArray(administrativeAreasLevel3)) return;

        return administrativeAreasLevel3.map(administrativeAreaLevel3 => this.makeResponse(administrativeAreaLevel3));
    }

    private makeAggregate(administrativeAreaLevel3: ObjectLiteral, cQMetadata?: CQMetadata): CommonAdministrativeAreaLevel3
    {
        return CommonAdministrativeAreaLevel3.register(
            new AdministrativeAreaLevel3Id(administrativeAreaLevel3.id),
            new AdministrativeAreaLevel3CountryId(administrativeAreaLevel3.countryId),
            new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreaLevel3.administrativeAreaLevel1Id),
            new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreaLevel3.administrativeAreaLevel2Id),
            new AdministrativeAreaLevel3Code(administrativeAreaLevel3.code),
            new AdministrativeAreaLevel3CustomCode(administrativeAreaLevel3.customCode),
            new AdministrativeAreaLevel3Name(administrativeAreaLevel3.name),
            new AdministrativeAreaLevel3Slug(administrativeAreaLevel3.slug),
            new AdministrativeAreaLevel3Latitude(administrativeAreaLevel3.latitude),
            new AdministrativeAreaLevel3Longitude(administrativeAreaLevel3.longitude),
            new AdministrativeAreaLevel3Zoom(administrativeAreaLevel3.zoom),
            new AdministrativeAreaLevel3CreatedAt(administrativeAreaLevel3.createdAt, {}, { addTimezone: cQMetadata?.timezone }),
            new AdministrativeAreaLevel3UpdatedAt(administrativeAreaLevel3.updatedAt, {}, { addTimezone: cQMetadata?.timezone }),
            new AdministrativeAreaLevel3DeletedAt(administrativeAreaLevel3.deletedAt, {}, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: false }).mapModelToAggregate(administrativeAreaLevel3.country) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel1Mapper({ eagerLoading: false }).mapModelToAggregate(administrativeAreaLevel3.administrativeAreaLevel1) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel2Mapper({ eagerLoading: false }).mapModelToAggregate(administrativeAreaLevel3.administrativeAreaLevel2) : undefined,
        );
    }

    private makeResponse(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): AdministrativeAreaLevel3Response
    {
        if (!administrativeAreaLevel3) return;

        return new AdministrativeAreaLevel3Response(
            administrativeAreaLevel3.id.value,
            administrativeAreaLevel3.countryId.value,
            administrativeAreaLevel3.administrativeAreaLevel1Id.value,
            administrativeAreaLevel3.administrativeAreaLevel2Id.value,
            administrativeAreaLevel3.code.value,
            administrativeAreaLevel3.customCode.value,
            administrativeAreaLevel3.name.value,
            administrativeAreaLevel3.slug.value,
            administrativeAreaLevel3.latitude.value,
            administrativeAreaLevel3.longitude.value,
            administrativeAreaLevel3.zoom.value,
            administrativeAreaLevel3.createdAt.value,
            administrativeAreaLevel3.updatedAt.value,
            administrativeAreaLevel3.deletedAt.value,
            this.options.eagerLoading ? new CountryMapper({ eagerLoading: false }).mapAggregateToResponse(administrativeAreaLevel3.country) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel1Mapper({ eagerLoading: false }).mapAggregateToResponse(administrativeAreaLevel3.administrativeAreaLevel1) : undefined,
            this.options.eagerLoading ? new AdministrativeAreaLevel2Mapper({ eagerLoading: false }).mapAggregateToResponse(administrativeAreaLevel3.administrativeAreaLevel2) : undefined,
        );
    }
}