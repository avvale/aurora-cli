/* eslint-disable key-spacing */
import { CommonCreateAdministrativeAreaLevel2Command } from '@app/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreaLevel2Service } from '@app/common/administrative-area-level-2/application/create/common-create-administrative-area-level-2.service';
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
  CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateAdministrativeAreaLevel2Command)
export class CommonCreateAdministrativeAreaLevel2CommandHandler
  implements ICommandHandler<CommonCreateAdministrativeAreaLevel2Command>
{
  constructor(
    private readonly createAdministrativeAreaLevel2Service: CommonCreateAdministrativeAreaLevel2Service,
  ) {}

  async execute(
    command: CommonCreateAdministrativeAreaLevel2Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createAdministrativeAreaLevel2Service.main(
      {
        id: new CommonAdministrativeAreaLevel2Id(command.payload.id),
        countryId: new CommonAdministrativeAreaLevel2CountryId(
          command.payload.countryId,
        ),
        administrativeAreaLevel1Id:
          new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(
            command.payload.administrativeAreaLevel1Id,
          ),
        code: new CommonAdministrativeAreaLevel2Code(command.payload.code),
        customCode: new CommonAdministrativeAreaLevel2CustomCode(
          command.payload.customCode,
        ),
        name: new CommonAdministrativeAreaLevel2Name(command.payload.name),
        slug: new CommonAdministrativeAreaLevel2Slug(command.payload.slug),
        latitude: new CommonAdministrativeAreaLevel2Latitude(
          command.payload.latitude,
        ),
        longitude: new CommonAdministrativeAreaLevel2Longitude(
          command.payload.longitude,
        ),
        zoom: new CommonAdministrativeAreaLevel2Zoom(command.payload.zoom),
        mapType: new CommonAdministrativeAreaLevel2MapType(
          command.payload.mapType,
        ),
      },
      command.cQMetadata,
    );
  }
}
