/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import {
  CommonAddAdministrativeAreasLevel1ContextEvent,
  CommonAdministrativeAreaLevel1,
  CommonIAdministrativeAreaLevel1Repository,
} from '@app/common/administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel1Code,
  CommonAdministrativeAreaLevel1CountryId,
  CommonAdministrativeAreaLevel1CreatedAt,
  CommonAdministrativeAreaLevel1CustomCode,
  CommonAdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel1Latitude,
  CommonAdministrativeAreaLevel1Longitude,
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel1Name,
  CommonAdministrativeAreaLevel1Slug,
  CommonAdministrativeAreaLevel1UpdatedAt,
  CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAdministrativeAreasLevel1Service {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel1Repository,
  ) {}

  async main(
    payload: {
      id: CommonAdministrativeAreaLevel1Id;
      countryId: CommonAdministrativeAreaLevel1CountryId;
      code: CommonAdministrativeAreaLevel1Code;
      customCode: CommonAdministrativeAreaLevel1CustomCode;
      name: CommonAdministrativeAreaLevel1Name;
      slug: CommonAdministrativeAreaLevel1Slug;
      latitude: CommonAdministrativeAreaLevel1Latitude;
      longitude: CommonAdministrativeAreaLevel1Longitude;
      zoom: CommonAdministrativeAreaLevel1Zoom;
      mapType: CommonAdministrativeAreaLevel1MapType;
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const administrativeAreasLevel1 = payload.map((administrativeAreaLevel1) =>
      CommonAdministrativeAreaLevel1.register(
        administrativeAreaLevel1.id,
        undefined, // rowId
        administrativeAreaLevel1.countryId,
        administrativeAreaLevel1.code,
        administrativeAreaLevel1.customCode,
        administrativeAreaLevel1.name,
        administrativeAreaLevel1.slug,
        administrativeAreaLevel1.latitude,
        administrativeAreaLevel1.longitude,
        administrativeAreaLevel1.zoom,
        administrativeAreaLevel1.mapType,
        new CommonAdministrativeAreaLevel1CreatedAt({ currentTimestamp: true }),
        new CommonAdministrativeAreaLevel1UpdatedAt({ currentTimestamp: true }),
        null, // deleteAt
      ),
    );

    // insert
    await this.repository.insert(administrativeAreasLevel1, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddAdministrativeAreasLevel1ContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const administrativeAreasLevel1Registered =
      this.publisher.mergeObjectContext(
        new CommonAddAdministrativeAreasLevel1ContextEvent(
          administrativeAreasLevel1,
          cQMetadata,
        ),
      );

    administrativeAreasLevel1Registered.created(); // apply event to model events
    administrativeAreasLevel1Registered.commit(); // commit all events of model
  }
}
