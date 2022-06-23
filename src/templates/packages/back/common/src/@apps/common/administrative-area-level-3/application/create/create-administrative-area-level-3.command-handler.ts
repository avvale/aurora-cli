/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministrativeAreaLevel3Command } from './create-administrative-area-level-3.command';
import { CreateAdministrativeAreaLevel3Service } from './create-administrative-area-level-3.service';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateAdministrativeAreaLevel3Command)
export class CreateAdministrativeAreaLevel3CommandHandler implements ICommandHandler<CreateAdministrativeAreaLevel3Command>
{
    constructor(
        private readonly createAdministrativeAreaLevel3Service: CreateAdministrativeAreaLevel3Service,
    ) {}

    async execute(command: CreateAdministrativeAreaLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreaLevel3Service.main(
            {
                id: new AdministrativeAreaLevel3Id(command.payload.id),
                countryId: new AdministrativeAreaLevel3CountryId(command.payload.countryId),
                administrativeAreaLevel1Id: new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id),
                administrativeAreaLevel2Id: new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(command.payload.administrativeAreaLevel2Id),
                code: new AdministrativeAreaLevel3Code(command.payload.code),
                customCode: new AdministrativeAreaLevel3CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel3Name(command.payload.name),
                slug: new AdministrativeAreaLevel3Slug(command.payload.slug),
                latitude: new AdministrativeAreaLevel3Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel3Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel3Zoom(command.payload.zoom),
            },
            command.cQMetadata,
        );
    }
}