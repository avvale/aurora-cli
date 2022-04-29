/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreaLevel1Command } from './update-administrative-area-level-1.command';
import { UpdateAdministrativeAreaLevel1Service } from './update-administrative-area-level-1.service';
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
} from './../../domain/value-objects';

@CommandHandler(UpdateAdministrativeAreaLevel1Command)
export class UpdateAdministrativeAreaLevel1CommandHandler implements ICommandHandler<UpdateAdministrativeAreaLevel1Command>
{
    constructor(
        private readonly updateAdministrativeAreaLevel1Service: UpdateAdministrativeAreaLevel1Service,
    ) {}

    async execute(command: UpdateAdministrativeAreaLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel1Service.main(
            {
                id: new AdministrativeAreaLevel1Id(command.payload.id),
                countryId: new AdministrativeAreaLevel1CountryId(command.payload.countryId, { undefinable: true }),
                code: new AdministrativeAreaLevel1Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel1Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel1Slug(command.payload.slug, { undefinable: true }),
                latitude: new AdministrativeAreaLevel1Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel1Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel1Zoom(command.payload.zoom),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}