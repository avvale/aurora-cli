/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreasLevel2Command } from './update-administrative-areas-level-2.command';
import { UpdateAdministrativeAreasLevel2Service } from './update-administrative-areas-level-2.service';
import {
    AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel2CountryId,
    AdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel2Code,
    AdministrativeAreaLevel2CustomCode,
    AdministrativeAreaLevel2Name,
    AdministrativeAreaLevel2Slug,
    AdministrativeAreaLevel2Latitude,
    AdministrativeAreaLevel2Longitude,
    AdministrativeAreaLevel2Zoom,
    AdministrativeAreaLevel2CreatedAt,
    AdministrativeAreaLevel2UpdatedAt,
    AdministrativeAreaLevel2DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAdministrativeAreasLevel2Command)
export class UpdateAdministrativeAreasLevel2CommandHandler implements ICommandHandler<UpdateAdministrativeAreasLevel2Command>
{
    constructor(
        private readonly updateAdministrativeAreasLevel2Service: UpdateAdministrativeAreasLevel2Service,
    ) {}

    async execute(command: UpdateAdministrativeAreasLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreasLevel2Service.main(
            {
                id: new AdministrativeAreaLevel2Id(command.payload.id, { undefinable: true }),
                countryId: new AdministrativeAreaLevel2CountryId(command.payload.countryId, { undefinable: true }),
                administrativeAreaLevel1Id: new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id, { undefinable: true }),
                code: new AdministrativeAreaLevel2Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel2CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel2Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel2Slug(command.payload.slug, { undefinable: true }),
                latitude: new AdministrativeAreaLevel2Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel2Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel2Zoom(command.payload.zoom),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}