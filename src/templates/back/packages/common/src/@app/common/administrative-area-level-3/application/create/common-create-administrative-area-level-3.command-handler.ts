/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateAdministrativeAreaLevel3Command } from './common-create-administrative-area-level-3.command';
import { CommonCreateAdministrativeAreaLevel3Service } from './common-create-administrative-area-level-3.service';
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

@CommandHandler(CommonCreateAdministrativeAreaLevel3Command)
export class CommonCreateAdministrativeAreaLevel3CommandHandler implements ICommandHandler<CommonCreateAdministrativeAreaLevel3Command>
{
    constructor(
        private readonly createAdministrativeAreaLevel3Service: CommonCreateAdministrativeAreaLevel3Service,
    ) {}

    async execute(command: CommonCreateAdministrativeAreaLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreaLevel3Service.main(
            {
                id: new CommonAdministrativeAreaLevel3Id(command.payload.id),
                countryId: new CommonAdministrativeAreaLevel3CountryId(command.payload.countryId),
                administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id),
                administrativeAreaLevel2Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(command.payload.administrativeAreaLevel2Id),
                code: new CommonAdministrativeAreaLevel3Code(command.payload.code),
                customCode: new CommonAdministrativeAreaLevel3CustomCode(command.payload.customCode),
                name: new CommonAdministrativeAreaLevel3Name(command.payload.name),
                slug: new CommonAdministrativeAreaLevel3Slug(command.payload.slug),
                latitude: new CommonAdministrativeAreaLevel3Latitude(command.payload.latitude),
                longitude: new CommonAdministrativeAreaLevel3Longitude(command.payload.longitude),
                zoom: new CommonAdministrativeAreaLevel3Zoom(command.payload.zoom),
                mapType: new CommonAdministrativeAreaLevel3MapType(command.payload.mapType),
            },
            command.cQMetadata,
        );
    }
}
