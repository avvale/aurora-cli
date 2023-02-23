/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreasLevel1Command } from './update-administrative-areas-level-1.command';
import { UpdateAdministrativeAreasLevel1Service } from './update-administrative-areas-level-1.service';
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

@CommandHandler(UpdateAdministrativeAreasLevel1Command)
export class UpdateAdministrativeAreasLevel1CommandHandler implements ICommandHandler<UpdateAdministrativeAreasLevel1Command>
{
    constructor(
        private readonly updateAdministrativeAreasLevel1Service: UpdateAdministrativeAreasLevel1Service,
    ) {}

    async execute(command: UpdateAdministrativeAreasLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreasLevel1Service.main(
            {
                id: new AdministrativeAreaLevel1Id(command.payload.id, { undefinable: true }),
                countryId: new AdministrativeAreaLevel1CountryId(command.payload.countryId, { undefinable: true }),
                code: new AdministrativeAreaLevel1Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel1Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel1Slug(command.payload.slug, { undefinable: true }),
                latitude: new AdministrativeAreaLevel1Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel1Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel1Zoom(command.payload.zoom),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}