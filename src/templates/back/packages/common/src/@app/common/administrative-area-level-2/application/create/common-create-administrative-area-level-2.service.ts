/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-2.aurora.yaml
 */
import {
  CommonAdministrativeAreaLevel2,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel2Code,
  CommonAdministrativeAreaLevel2CountryId,
  CommonAdministrativeAreaLevel2CreatedAt,
  CommonAdministrativeAreaLevel2CustomCode,
  CommonAdministrativeAreaLevel2Id,
  CommonAdministrativeAreaLevel2Latitude,
  CommonAdministrativeAreaLevel2Longitude,
  CommonAdministrativeAreaLevel2MapType,
  CommonAdministrativeAreaLevel2Name,
  CommonAdministrativeAreaLevel2Slug,
  CommonAdministrativeAreaLevel2UpdatedAt,
  CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonCreateAdministrativeAreaLevel2Service {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    payload: {
      id: CommonAdministrativeAreaLevel2Id;
      countryId: CommonAdministrativeAreaLevel2CountryId;
      administrativeAreaLevel1Id: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id;
      code: CommonAdministrativeAreaLevel2Code;
      customCode: CommonAdministrativeAreaLevel2CustomCode;
      name: CommonAdministrativeAreaLevel2Name;
      slug: CommonAdministrativeAreaLevel2Slug;
      latitude: CommonAdministrativeAreaLevel2Latitude;
      longitude: CommonAdministrativeAreaLevel2Longitude;
      zoom: CommonAdministrativeAreaLevel2Zoom;
      mapType: CommonAdministrativeAreaLevel2MapType;
    },
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const administrativeAreaLevel2 = CommonAdministrativeAreaLevel2.register(
      payload.id,
      undefined, // rowId
      payload.countryId,
      payload.administrativeAreaLevel1Id,
      payload.code,
      payload.customCode,
      payload.name,
      payload.slug,
      payload.latitude,
      payload.longitude,
      payload.zoom,
      payload.mapType,
      new CommonAdministrativeAreaLevel2CreatedAt({ currentTimestamp: true }),
      new CommonAdministrativeAreaLevel2UpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    await this.repository.create(administrativeAreaLevel2, {
      createOptions: cQMetadata?.repositoryOptions,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const administrativeAreaLevel2Register = this.publisher.mergeObjectContext(
      administrativeAreaLevel2,
    );

    administrativeAreaLevel2Register.created({
      payload: administrativeAreaLevel2,
      cQMetadata,
    }); // apply event to model events
    administrativeAreaLevel2Register.commit(); // commit all events of model
  }
}
