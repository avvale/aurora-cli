/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateAdministrativeAreasLevel3Command } from './common-create-administrative-areas-level-3.command';
import { CommonCreateAdministrativeAreasLevel3Service } from './common-create-administrative-areas-level-3.service';
import {
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3Zoom,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3CreatedAt,
    CommonAdministrativeAreaLevel3UpdatedAt,
    CommonAdministrativeAreaLevel3DeletedAt,
} from '../../domain/value-objects';

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
