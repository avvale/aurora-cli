/* eslint-disable key-spacing */
import { CommonUpdateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { CommonUpdateAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/update/common-update-administrative-areas-level-2.service';
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

@CommandHandler(CommonUpdateAdministrativeAreasLevel2Command)
export class CommonUpdateAdministrativeAreasLevel2CommandHandler
  implements ICommandHandler<CommonUpdateAdministrativeAreasLevel2Command>
{
  constructor(
    private readonly updateAdministrativeAreasLevel2Service: CommonUpdateAdministrativeAreasLevel2Service,
  ) {}

  async execute(
    command: CommonUpdateAdministrativeAreasLevel2Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateAdministrativeAreasLevel2Service.main(
      {
        id: new CommonAdministrativeAreaLevel2Id(command.payload.id, {
          undefinable: true,
        }),
        countryId: new CommonAdministrativeAreaLevel2CountryId(
          command.payload.countryId,
          { undefinable: true },
        ),
        administrativeAreaLevel1Id:
          new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(
            command.payload.administrativeAreaLevel1Id,
            { undefinable: true },
          ),
        code: new CommonAdministrativeAreaLevel2Code(command.payload.code, {
          undefinable: true,
        }),
        customCode: new CommonAdministrativeAreaLevel2CustomCode(
          command.payload.customCode,
        ),
        name: new CommonAdministrativeAreaLevel2Name(command.payload.name, {
          undefinable: true,
        }),
        slug: new CommonAdministrativeAreaLevel2Slug(command.payload.slug, {
          undefinable: true,
        }),
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
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
