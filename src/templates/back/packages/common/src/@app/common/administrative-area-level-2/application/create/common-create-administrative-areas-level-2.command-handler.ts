/* eslint-disable key-spacing */
import { CommonCreateAdministrativeAreasLevel2Command } from '@app/common/administrative-area-level-2';
import { CommonCreateAdministrativeAreasLevel2Service } from '@app/common/administrative-area-level-2/application/create/common-create-administrative-areas-level-2.service';
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

@CommandHandler(CommonCreateAdministrativeAreasLevel2Command)
export class CommonCreateAdministrativeAreasLevel2CommandHandler
  implements ICommandHandler<CommonCreateAdministrativeAreasLevel2Command>
{
  constructor(
    private readonly createAdministrativeAreasLevel2Service: CommonCreateAdministrativeAreasLevel2Service,
  ) {}

  async execute(
    command: CommonCreateAdministrativeAreasLevel2Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createAdministrativeAreasLevel2Service.main(
      command.payload.map((administrativeAreaLevel2) => {
        return {
          id: new CommonAdministrativeAreaLevel2Id(administrativeAreaLevel2.id),
          countryId: new CommonAdministrativeAreaLevel2CountryId(
            administrativeAreaLevel2.countryId,
          ),
          administrativeAreaLevel1Id:
            new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(
              administrativeAreaLevel2.administrativeAreaLevel1Id,
            ),
          code: new CommonAdministrativeAreaLevel2Code(
            administrativeAreaLevel2.code,
          ),
          customCode: new CommonAdministrativeAreaLevel2CustomCode(
            administrativeAreaLevel2.customCode,
          ),
          name: new CommonAdministrativeAreaLevel2Name(
            administrativeAreaLevel2.name,
          ),
          slug: new CommonAdministrativeAreaLevel2Slug(
            administrativeAreaLevel2.slug,
          ),
          latitude: new CommonAdministrativeAreaLevel2Latitude(
            administrativeAreaLevel2.latitude,
          ),
          longitude: new CommonAdministrativeAreaLevel2Longitude(
            administrativeAreaLevel2.longitude,
          ),
          zoom: new CommonAdministrativeAreaLevel2Zoom(
            administrativeAreaLevel2.zoom,
          ),
          mapType: new CommonAdministrativeAreaLevel2MapType(
            administrativeAreaLevel2.mapType,
          ),
        };
      }),
      command.cQMetadata,
    );
  }
}
