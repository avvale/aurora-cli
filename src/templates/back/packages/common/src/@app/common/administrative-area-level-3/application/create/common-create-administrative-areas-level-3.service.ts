import {
  CommonAddAdministrativeAreasLevel3ContextEvent,
  CommonAdministrativeAreaLevel3,
  CommonIAdministrativeAreaLevel3Repository,
} from '@app/common/administrative-area-level-3';
import {
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel3Code,
  CommonAdministrativeAreaLevel3CountryId,
  CommonAdministrativeAreaLevel3CreatedAt,
  CommonAdministrativeAreaLevel3CustomCode,
  CommonAdministrativeAreaLevel3Id,
  CommonAdministrativeAreaLevel3Latitude,
  CommonAdministrativeAreaLevel3Longitude,
  CommonAdministrativeAreaLevel3MapType,
  CommonAdministrativeAreaLevel3Name,
  CommonAdministrativeAreaLevel3Slug,
  CommonAdministrativeAreaLevel3UpdatedAt,
  CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAdministrativeAreasLevel3Service {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel3Repository,
  ) {}

  async main(
    payload: {
      id: CommonAdministrativeAreaLevel3Id;
      countryId: CommonAdministrativeAreaLevel3CountryId;
      administrativeAreaLevel1Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id;
      administrativeAreaLevel2Id: CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id;
      code: CommonAdministrativeAreaLevel3Code;
      customCode: CommonAdministrativeAreaLevel3CustomCode;
      name: CommonAdministrativeAreaLevel3Name;
      slug: CommonAdministrativeAreaLevel3Slug;
      latitude: CommonAdministrativeAreaLevel3Latitude;
      longitude: CommonAdministrativeAreaLevel3Longitude;
      zoom: CommonAdministrativeAreaLevel3Zoom;
      mapType: CommonAdministrativeAreaLevel3MapType;
    }[],
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const aggregateAdministrativeAreasLevel3 = payload.map(
      (administrativeAreaLevel3) =>
        CommonAdministrativeAreaLevel3.register(
          administrativeAreaLevel3.id,
          administrativeAreaLevel3.countryId,
          administrativeAreaLevel3.administrativeAreaLevel1Id,
          administrativeAreaLevel3.administrativeAreaLevel2Id,
          administrativeAreaLevel3.code,
          administrativeAreaLevel3.customCode,
          administrativeAreaLevel3.name,
          administrativeAreaLevel3.slug,
          administrativeAreaLevel3.latitude,
          administrativeAreaLevel3.longitude,
          administrativeAreaLevel3.zoom,
          administrativeAreaLevel3.mapType,
          new CommonAdministrativeAreaLevel3CreatedAt({
            currentTimestamp: true,
          }),
          new CommonAdministrativeAreaLevel3UpdatedAt({
            currentTimestamp: true,
          }),
          null, // deleteAt
        ),
    );

    // insert
    await this.repository.insert(aggregateAdministrativeAreasLevel3, {
      insertOptions: cQMetadata?.repositoryOptions,
    });

    // create AddAdministrativeAreasLevel3ContextEvent to have object wrapper to add event publisher functionality
    // insert EventBus in object, to be able to apply and commit events
    const administrativeAreasLevel3Registered =
      this.publisher.mergeObjectContext(
        new CommonAddAdministrativeAreasLevel3ContextEvent(
          aggregateAdministrativeAreasLevel3,
        ),
      );

    administrativeAreasLevel3Registered.created(); // apply event to model events
    administrativeAreasLevel3Registered.commit(); // commit all events of model
  }
}
