/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministrativeAreasLevel1Command } from './create-administrative-areas-level-1.command';
import { CreateAdministrativeAreasLevel1Service } from './create-administrative-areas-level-1.service';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateAdministrativeAreasLevel1Command)
export class CreateAdministrativeAreasLevel1CommandHandler implements ICommandHandler<CreateAdministrativeAreasLevel1Command>
{
    constructor(
        private readonly createAdministrativeAreasLevel1Service: CreateAdministrativeAreasLevel1Service,
    ) {}

    async execute(command: CreateAdministrativeAreasLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreasLevel1Service.main(
            command.payload
                .map(administrativeAreaLevel1 =>
                {
                    return {
                        id: new AdministrativeAreaLevel1Id(administrativeAreaLevel1.id),
                        countryId: new AdministrativeAreaLevel1CountryId(administrativeAreaLevel1.countryId),
                        code: new AdministrativeAreaLevel1Code(administrativeAreaLevel1.code),
                        customCode: new AdministrativeAreaLevel1CustomCode(administrativeAreaLevel1.customCode),
                        name: new AdministrativeAreaLevel1Name(administrativeAreaLevel1.name),
                        slug: new AdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug),
                        latitude: new AdministrativeAreaLevel1Latitude(administrativeAreaLevel1.latitude),
                        longitude: new AdministrativeAreaLevel1Longitude(administrativeAreaLevel1.longitude),
                        zoom: new AdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom),
                    };
                }),
            command.cQMetadata,
        );
    }
}