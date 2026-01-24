/* eslint-disable key-spacing */
import { CommonUpsertAdministrativeAreaLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonUpsertAdministrativeAreaLevel1Service } from '@app/common/administrative-area-level-1/application/upsert/common-upsert-administrative-area-level-1.service';
import {
  CommonAdministrativeAreaLevel1Code,
  CommonAdministrativeAreaLevel1CountryId,
  CommonAdministrativeAreaLevel1CustomCode,
  CommonAdministrativeAreaLevel1Id,
  CommonAdministrativeAreaLevel1Latitude,
  CommonAdministrativeAreaLevel1Longitude,
  CommonAdministrativeAreaLevel1MapType,
  CommonAdministrativeAreaLevel1Name,
  CommonAdministrativeAreaLevel1Slug,
  CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpsertAdministrativeAreaLevel1Command)
export class CommonUpsertAdministrativeAreaLevel1CommandHandler
  implements ICommandHandler<CommonUpsertAdministrativeAreaLevel1Command>
{
  constructor(
    private readonly upsertAdministrativeAreaLevel1Service: CommonUpsertAdministrativeAreaLevel1Service,
  ) {}

  async execute(
    command: CommonUpsertAdministrativeAreaLevel1Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.upsertAdministrativeAreaLevel1Service.main(
      {
        id: new CommonAdministrativeAreaLevel1Id(command.payload.id),
        countryId: new CommonAdministrativeAreaLevel1CountryId(
          command.payload.countryId,
        ),
        code: new CommonAdministrativeAreaLevel1Code(command.payload.code),
        customCode: new CommonAdministrativeAreaLevel1CustomCode(
          command.payload.customCode,
        ),
        name: new CommonAdministrativeAreaLevel1Name(command.payload.name),
        slug: new CommonAdministrativeAreaLevel1Slug(command.payload.slug),
        latitude: new CommonAdministrativeAreaLevel1Latitude(
          command.payload.latitude,
        ),
        longitude: new CommonAdministrativeAreaLevel1Longitude(
          command.payload.longitude,
        ),
        zoom: new CommonAdministrativeAreaLevel1Zoom(command.payload.zoom),
        mapType: new CommonAdministrativeAreaLevel1MapType(
          command.payload.mapType,
        ),
      },
      command.cQMetadata,
    );
  }
}
