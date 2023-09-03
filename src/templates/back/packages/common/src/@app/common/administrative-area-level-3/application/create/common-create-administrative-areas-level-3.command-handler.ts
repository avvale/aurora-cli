/* eslint-disable key-spacing */
import { CommonCreateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/create/common-create-administrative-areas-level-3.service';
import {
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateAdministrativeAreasLevel3Command)
export class CommonCreateAdministrativeAreasLevel3CommandHandler implements ICommandHandler<CommonCreateAdministrativeAreasLevel3Command>
{
    constructor(
        private readonly createAdministrativeAreasLevel3Service: CommonCreateAdministrativeAreasLevel3Service,
    ) {}

    async execute(command: CommonCreateAdministrativeAreasLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreasLevel3Service.main(
            command.payload
                .map(administrativeAreaLevel3 =>
                {
                    return {
                        id: new CommonAdministrativeAreaLevel3Id(administrativeAreaLevel3.id),
                        countryId: new CommonAdministrativeAreaLevel3CountryId(administrativeAreaLevel3.countryId),
                        administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreaLevel3.administrativeAreaLevel1Id),
                        administrativeAreaLevel2Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreaLevel3.administrativeAreaLevel2Id),
                        code: new CommonAdministrativeAreaLevel3Code(administrativeAreaLevel3.code),
                        customCode: new CommonAdministrativeAreaLevel3CustomCode(administrativeAreaLevel3.customCode),
                        name: new CommonAdministrativeAreaLevel3Name(administrativeAreaLevel3.name),
                        slug: new CommonAdministrativeAreaLevel3Slug(administrativeAreaLevel3.slug),
                        latitude: new CommonAdministrativeAreaLevel3Latitude(administrativeAreaLevel3.latitude),
                        longitude: new CommonAdministrativeAreaLevel3Longitude(administrativeAreaLevel3.longitude),
                        zoom: new CommonAdministrativeAreaLevel3Zoom(administrativeAreaLevel3.zoom),
                        mapType: new CommonAdministrativeAreaLevel3MapType(administrativeAreaLevel3.mapType),
                    };
                }),
            command.cQMetadata,
        );
    }
}
