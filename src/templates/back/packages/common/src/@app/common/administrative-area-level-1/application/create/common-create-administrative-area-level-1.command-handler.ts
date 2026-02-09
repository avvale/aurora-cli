/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonCreateAdministrativeAreaLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreaLevel1Service } from '@app/common/administrative-area-level-1/application/create/common-create-administrative-area-level-1.service';
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

@CommandHandler(CommonCreateAdministrativeAreaLevel1Command)
export class CommonCreateAdministrativeAreaLevel1CommandHandler
  implements ICommandHandler<CommonCreateAdministrativeAreaLevel1Command>
{
  constructor(
    private readonly createAdministrativeAreaLevel1Service: CommonCreateAdministrativeAreaLevel1Service,
  ) {}

  async execute(
    command: CommonCreateAdministrativeAreaLevel1Command,
  ): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createAdministrativeAreaLevel1Service.main(
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
