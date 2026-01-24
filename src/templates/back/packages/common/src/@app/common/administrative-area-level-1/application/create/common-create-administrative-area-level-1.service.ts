import {
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
export class CommonCreateAdministrativeAreaLevel1Service {
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
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const administrativeAreaLevel1 = CommonAdministrativeAreaLevel1.register(
      payload.id,
      payload.countryId,
      payload.code,
      payload.customCode,
      payload.name,
      payload.slug,
      payload.latitude,
      payload.longitude,
      payload.zoom,
      payload.mapType,
      new CommonAdministrativeAreaLevel1CreatedAt({ currentTimestamp: true }),
      new CommonAdministrativeAreaLevel1UpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(administrativeAreaLevel1, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const administrativeAreaLevel1Register = this.publisher.mergeObjectContext(
      administrativeAreaLevel1,
    );

    administrativeAreaLevel1Register.created(administrativeAreaLevel1); // apply event to model events
    administrativeAreaLevel1Register.commit(); // commit all events of model
  }
}
