import {
  CommonAddAdministrativeAreasLevel2ContextEvent,
  CommonAdministrativeAreaLevel2,
  CommonIAdministrativeAreaLevel2Repository,
} from '@app/common/administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel2Code,
  CommonAdministrativeAreaLevel2CountryId,
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class CommonUpdateAdministrativeAreasLevel2Service {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: CommonIAdministrativeAreaLevel2Repository,
  ) {}

  async main(
    payload: {
      id?: CommonAdministrativeAreaLevel2Id;
      countryId?: CommonAdministrativeAreaLevel2CountryId;
      administrativeAreaLevel1Id?: CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id;
      code?: CommonAdministrativeAreaLevel2Code;
      customCode?: CommonAdministrativeAreaLevel2CustomCode;
      name?: CommonAdministrativeAreaLevel2Name;
      slug?: CommonAdministrativeAreaLevel2Slug;
      latitude?: CommonAdministrativeAreaLevel2Latitude;
      longitude?: CommonAdministrativeAreaLevel2Longitude;
      zoom?: CommonAdministrativeAreaLevel2Zoom;
      mapType?: CommonAdministrativeAreaLevel2MapType;
    },
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<void> {
    // create aggregate with factory pattern
    const administrativeAreaLevel2 = CommonAdministrativeAreaLevel2.register(
      payload.id,
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
      null, // createdAt
      new CommonAdministrativeAreaLevel2UpdatedAt({ currentTimestamp: true }),
      null, // deletedAt
    );

    // update
    await this.repository.update(administrativeAreaLevel2, {
      queryStatement,
      constraint,
      cQMetadata,
      updateOptions: cQMetadata?.repositoryOptions,
    });

    // get objects to delete
    const administrativeAreasLevel2 = await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });

    // merge EventBus methods with object returned by the repository, to be able to apply and commit events
    const administrativeAreasLevel2Register = this.publisher.mergeObjectContext(
      new CommonAddAdministrativeAreasLevel2ContextEvent(
        administrativeAreasLevel2,
      ),
    );

    administrativeAreasLevel2Register.updated(); // apply event to model events
    administrativeAreasLevel2Register.commit(); // commit all events of model
  }
}
