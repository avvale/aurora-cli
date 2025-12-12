import { CommonAdministrativeAreaLevel1Mapper } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Mapper } from '@app/common/administrative-area-level-2';
import {
    CommonAdministrativeAreaLevel3,
    CommonAdministrativeAreaLevel3Response,
} from '@app/common/administrative-area-level-3';
import {
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3CreatedAt,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3DeletedAt,
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3UpdatedAt,
    CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommonCountryMapper } from '@app/common/country';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel3Mapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param administrativeAreaLevel3
     */
    mapModelToAggregate(
        administrativeAreaLevel3: LiteralObject,
        cQMetadata?: CQMetadata,
    ): CommonAdministrativeAreaLevel3 {
        if (!administrativeAreaLevel3) return;

        return this.makeAggregate(administrativeAreaLevel3, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param administrativeAreasLevel3
     */
    mapModelsToAggregates(
        administrativeAreasLevel3: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): CommonAdministrativeAreaLevel3[] {
        if (!Array.isArray(administrativeAreasLevel3)) return;

        return administrativeAreasLevel3.map((administrativeAreaLevel3) =>
            this.makeAggregate(administrativeAreaLevel3, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param administrativeAreaLevel3
     */
    mapAggregateToResponse(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
    ): CommonAdministrativeAreaLevel3Response {
        return this.makeResponse(administrativeAreaLevel3);
    }

    /**
     * Map array of aggregates to array responses
     * @param administrativeAreasLevel3
     */
    mapAggregatesToResponses(
        administrativeAreasLevel3: CommonAdministrativeAreaLevel3[],
    ): CommonAdministrativeAreaLevel3Response[] {
        if (!Array.isArray(administrativeAreasLevel3)) return;

        return administrativeAreasLevel3.map((administrativeAreaLevel3) =>
            this.makeResponse(administrativeAreaLevel3),
        );
    }

    private makeAggregate(
        administrativeAreaLevel3: LiteralObject,
        cQMetadata?: CQMetadata,
    ): CommonAdministrativeAreaLevel3 {
        return CommonAdministrativeAreaLevel3.register(
            new CommonAdministrativeAreaLevel3Id(administrativeAreaLevel3.id, {
                undefinable: true,
            }),
            new CommonAdministrativeAreaLevel3CountryId(
                administrativeAreaLevel3.countryId,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(
                administrativeAreaLevel3.administrativeAreaLevel1Id,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(
                administrativeAreaLevel3.administrativeAreaLevel2Id,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3Code(
                administrativeAreaLevel3.code,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3CustomCode(
                administrativeAreaLevel3.customCode,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3Name(
                administrativeAreaLevel3.name,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3Slug(
                administrativeAreaLevel3.slug,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3Latitude(
                administrativeAreaLevel3.latitude,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3Longitude(
                administrativeAreaLevel3.longitude,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3Zoom(
                administrativeAreaLevel3.zoom,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3MapType(
                administrativeAreaLevel3.mapType,
                { undefinable: true },
            ),
            new CommonAdministrativeAreaLevel3CreatedAt(
                administrativeAreaLevel3.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new CommonAdministrativeAreaLevel3UpdatedAt(
                administrativeAreaLevel3.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new CommonAdministrativeAreaLevel3DeletedAt(
                administrativeAreaLevel3.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            this.options.eagerLoading
                ? new CommonCountryMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(
                      administrativeAreaLevel3.country,
                      cQMetadata,
                  )
                : undefined,
            this.options.eagerLoading
                ? new CommonAdministrativeAreaLevel1Mapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(
                      administrativeAreaLevel3.administrativeAreaLevel1,
                      cQMetadata,
                  )
                : undefined,
            this.options.eagerLoading
                ? new CommonAdministrativeAreaLevel2Mapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(
                      administrativeAreaLevel3.administrativeAreaLevel2,
                      cQMetadata,
                  )
                : undefined,
        );
    }

    private makeResponse(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
    ): CommonAdministrativeAreaLevel3Response {
        if (!administrativeAreaLevel3) return null;

        return new CommonAdministrativeAreaLevel3Response(
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
            administrativeAreaLevel3.mapType.value,
            administrativeAreaLevel3.createdAt.value,
            administrativeAreaLevel3.updatedAt.value,
            administrativeAreaLevel3.deletedAt.value,
            this.options.eagerLoading
                ? new CommonCountryMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(administrativeAreaLevel3.country)
                : undefined,
            this.options.eagerLoading
                ? new CommonAdministrativeAreaLevel1Mapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(
                      administrativeAreaLevel3.administrativeAreaLevel1,
                  )
                : undefined,
            this.options.eagerLoading
                ? new CommonAdministrativeAreaLevel2Mapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(
                      administrativeAreaLevel3.administrativeAreaLevel2,
                  )
                : undefined,
        );
    }
}
