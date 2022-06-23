/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministrativeAreasLevel3Command } from './create-administrative-areas-level-3.command';
import { CreateAdministrativeAreasLevel3Service } from './create-administrative-areas-level-3.service';
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

@CommandHandler(CreateAdministrativeAreasLevel3Command)
export class CreateAdministrativeAreasLevel3CommandHandler implements ICommandHandler<CreateAdministrativeAreasLevel3Command>
{
    constructor(
        private readonly createAdministrativeAreasLevel3Service: CreateAdministrativeAreasLevel3Service,
    ) {}

    async execute(command: CreateAdministrativeAreasLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreasLevel3Service.main(
            command.payload
                .map(administrativeAreaLevel3 =>
                {
                    return {
                        id: new AdministrativeAreaLevel3Id(administrativeAreaLevel3.id),
                        countryId: new AdministrativeAreaLevel3CountryId(administrativeAreaLevel3.countryId),
                        administrativeAreaLevel1Id: new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(administrativeAreaLevel3.administrativeAreaLevel1Id),
                        administrativeAreaLevel2Id: new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(administrativeAreaLevel3.administrativeAreaLevel2Id),
                        code: new AdministrativeAreaLevel3Code(administrativeAreaLevel3.code),
                        customCode: new AdministrativeAreaLevel3CustomCode(administrativeAreaLevel3.customCode),
                        name: new AdministrativeAreaLevel3Name(administrativeAreaLevel3.name),
                        slug: new AdministrativeAreaLevel3Slug(administrativeAreaLevel3.slug),
                        latitude: new AdministrativeAreaLevel3Latitude(administrativeAreaLevel3.latitude),
                        longitude: new AdministrativeAreaLevel3Longitude(administrativeAreaLevel3.longitude),
                        zoom: new AdministrativeAreaLevel3Zoom(administrativeAreaLevel3.zoom),
                    };
                }),
            command.cQMetadata,
        );
    }
}