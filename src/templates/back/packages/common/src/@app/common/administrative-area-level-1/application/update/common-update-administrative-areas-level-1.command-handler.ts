/* eslint-disable key-spacing */
import { CommonUpdateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-areas-level-1.service';
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

@CommandHandler(CommonUpdateAdministrativeAreasLevel1Command)
export class CommonUpdateAdministrativeAreasLevel1CommandHandler
  implements ICommandHandler<CommonUpdateAdministrativeAreasLevel1Command>
{
  constructor(
    private readonly updateAdministrativeAreasLevel1Service: CommonUpdateAdministrativeAreasLevel1Service,
  ) {}

  async execute(
    command: CommonUpdateAdministrativeAreasLevel1Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateAdministrativeAreasLevel1Service.main(
      {
        id: new CommonAdministrativeAreaLevel1Id(command.payload.id, {
          undefinable: true,
        }),
        countryId: new CommonAdministrativeAreaLevel1CountryId(
          command.payload.countryId,
          { undefinable: true },
        ),
        code: new CommonAdministrativeAreaLevel1Code(command.payload.code, {
          undefinable: true,
        }),
        customCode: new CommonAdministrativeAreaLevel1CustomCode(
          command.payload.customCode,
        ),
        name: new CommonAdministrativeAreaLevel1Name(command.payload.name, {
          undefinable: true,
        }),
        slug: new CommonAdministrativeAreaLevel1Slug(command.payload.slug, {
          undefinable: true,
        }),
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
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
