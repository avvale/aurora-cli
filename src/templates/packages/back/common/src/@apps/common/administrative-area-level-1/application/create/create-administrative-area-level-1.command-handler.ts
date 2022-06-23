/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministrativeAreaLevel1Command } from './create-administrative-area-level-1.command';
import { CreateAdministrativeAreaLevel1Service } from './create-administrative-area-level-1.service';
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

@CommandHandler(CreateAdministrativeAreaLevel1Command)
export class CreateAdministrativeAreaLevel1CommandHandler implements ICommandHandler<CreateAdministrativeAreaLevel1Command>
{
    constructor(
        private readonly createAdministrativeAreaLevel1Service: CreateAdministrativeAreaLevel1Service,
    ) {}

    async execute(command: CreateAdministrativeAreaLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreaLevel1Service.main(
            {
                id: new AdministrativeAreaLevel1Id(command.payload.id),
                countryId: new AdministrativeAreaLevel1CountryId(command.payload.countryId),
                code: new AdministrativeAreaLevel1Code(command.payload.code),
                customCode: new AdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel1Name(command.payload.name),
                slug: new AdministrativeAreaLevel1Slug(command.payload.slug),
                latitude: new AdministrativeAreaLevel1Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel1Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel1Zoom(command.payload.zoom),
            },
            command.cQMetadata,
        );
    }
}