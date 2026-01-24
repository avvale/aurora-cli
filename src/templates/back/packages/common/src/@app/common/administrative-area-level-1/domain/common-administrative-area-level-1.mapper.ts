import {
  CommonAdministrativeAreaLevel1,
  CommonAdministrativeAreaLevel1Response,
} from '@app/common/administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel1Code,
  CommonAdministrativeAreaLevel1CountryId,
  CommonAdministrativeAreaLevel1CreatedAt,
  CommonAdministrativeAreaLevel1CustomCode,
  CommonAdministrativeAreaLevel1DeletedAt,
  CommonAdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel1Latitude,
  CommonAdministrativeAreaLevel1Longitude,
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel1Name,
  CommonAdministrativeAreaLevel1Slug,
  CommonAdministrativeAreaLevel1UpdatedAt,
  CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { CommonCountryMapper } from '@app/common/country';
import {
  CQMetadata,
  IMapper,
  LiteralObject,
  MapperOptions,
} from '@aurorajs.dev/core';

export class CommonAdministrativeAreaLevel1Mapper implements IMapper {
  constructor(public options: MapperOptions = { eagerLoading: true }) {}

  /**
   * Map object to aggregate
   * @param administrativeAreaLevel1
   */
  mapModelToAggregate(
    administrativeAreaLevel1: LiteralObject,
    cQMetadata?: CQMetadata,
  ): CommonAdministrativeAreaLevel1 {
    if (!administrativeAreaLevel1) return;

    return this.makeAggregate(administrativeAreaLevel1, cQMetadata);
  }

  /**
   * Map array of objects to array aggregates
   * @param administrativeAreasLevel1
   */
  mapModelsToAggregates(
    administrativeAreasLevel1: LiteralObject[],
    cQMetadata?: CQMetadata,
  ): CommonAdministrativeAreaLevel1[] {
    if (!Array.isArray(administrativeAreasLevel1)) return;

    return administrativeAreasLevel1.map((administrativeAreaLevel1) =>
      this.makeAggregate(administrativeAreaLevel1, cQMetadata),
    );
  }

  /**
   * Map aggregate to response
   * @param administrativeAreaLevel1
   */
  mapAggregateToResponse(
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1,
  ): CommonAdministrativeAreaLevel1Response {
    return this.makeResponse(administrativeAreaLevel1);
  }

  /**
   * Map array of aggregates to array responses
   * @param administrativeAreasLevel1
   */
  mapAggregatesToResponses(
    administrativeAreasLevel1: CommonAdministrativeAreaLevel1[],
  ): CommonAdministrativeAreaLevel1Response[] {
    if (!Array.isArray(administrativeAreasLevel1)) return;

    return administrativeAreasLevel1.map((administrativeAreaLevel1) =>
      this.makeResponse(administrativeAreaLevel1),
    );
  }

  private makeAggregate(
    administrativeAreaLevel1: LiteralObject,
    cQMetadata?: CQMetadata,
  ): CommonAdministrativeAreaLevel1 {
    return CommonAdministrativeAreaLevel1.register(
      new CommonAdministrativeAreaLevel1Id(administrativeAreaLevel1.id, {
        undefinable: true,
      }),
      new CommonAdministrativeAreaLevel1CountryId(
        administrativeAreaLevel1.countryId,
        { undefinable: true },
      ),
      new CommonAdministrativeAreaLevel1Code(administrativeAreaLevel1.code, {
        undefinable: true,
      }),
      new CommonAdministrativeAreaLevel1CustomCode(
        administrativeAreaLevel1.customCode,
        { undefinable: true },
      ),
      new CommonAdministrativeAreaLevel1Name(administrativeAreaLevel1.name, {
        undefinable: true,
      }),
      new CommonAdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug, {
        undefinable: true,
      }),
      new CommonAdministrativeAreaLevel1Latitude(
        administrativeAreaLevel1.latitude,
        { undefinable: true },
      ),
      new CommonAdministrativeAreaLevel1Longitude(
        administrativeAreaLevel1.longitude,
        { undefinable: true },
      ),
      new CommonAdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom, {
        undefinable: true,
      }),
      new CommonAdministrativeAreaLevel1MapType(
        administrativeAreaLevel1.mapType,
        { undefinable: true },
      ),
      new CommonAdministrativeAreaLevel1CreatedAt(
        administrativeAreaLevel1.createdAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new CommonAdministrativeAreaLevel1UpdatedAt(
        administrativeAreaLevel1.updatedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      new CommonAdministrativeAreaLevel1DeletedAt(
        administrativeAreaLevel1.deletedAt,
        { undefinable: true },
        { addTimezone: cQMetadata?.timezone },
      ),
      this.options.eagerLoading
        ? new CommonCountryMapper({
            eagerLoading: true,
          }).mapModelToAggregate(administrativeAreaLevel1.country, cQMetadata)
        : undefined,
    );
  }

  private makeResponse(
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1,
  ): CommonAdministrativeAreaLevel1Response {
    if (!administrativeAreaLevel1) return null;

    return new CommonAdministrativeAreaLevel1Response(
      administrativeAreaLevel1.id.value,
      administrativeAreaLevel1.countryId.value,
      administrativeAreaLevel1.code.value,
      administrativeAreaLevel1.customCode.value,
      administrativeAreaLevel1.name.value,
      administrativeAreaLevel1.slug.value,
      administrativeAreaLevel1.latitude.value,
      administrativeAreaLevel1.longitude.value,
      administrativeAreaLevel1.zoom.value,
      administrativeAreaLevel1.mapType.value,
      administrativeAreaLevel1.createdAt.value,
      administrativeAreaLevel1.updatedAt.value,
      administrativeAreaLevel1.deletedAt.value,
      this.options.eagerLoading
        ? new CommonCountryMapper({
            eagerLoading: true,
          }).mapAggregateToResponse(administrativeAreaLevel1.country)
        : undefined,
    );
  }
}
