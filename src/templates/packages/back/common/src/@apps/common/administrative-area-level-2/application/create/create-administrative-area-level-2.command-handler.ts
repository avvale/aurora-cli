/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministrativeAreaLevel2Command } from './create-administrative-area-level-2.command';
import { CreateAdministrativeAreaLevel2Service } from './create-administrative-area-level-2.service';
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

@CommandHandler(CreateAdministrativeAreaLevel2Command)
export class CreateAdministrativeAreaLevel2CommandHandler implements ICommandHandler<CreateAdministrativeAreaLevel2Command>
{
    constructor(
        private readonly createAdministrativeAreaLevel2Service: CreateAdministrativeAreaLevel2Service,
    ) {}

    async execute(command: CreateAdministrativeAreaLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreaLevel2Service.main(
            {
                id: new AdministrativeAreaLevel2Id(command.payload.id),
                countryId: new AdministrativeAreaLevel2CountryId(command.payload.countryId),
                administrativeAreaLevel1Id: new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id),
                code: new AdministrativeAreaLevel2Code(command.payload.code),
                customCode: new AdministrativeAreaLevel2CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel2Name(command.payload.name),
                slug: new AdministrativeAreaLevel2Slug(command.payload.slug),
                latitude: new AdministrativeAreaLevel2Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel2Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel2Zoom(command.payload.zoom),
            },
            command.cQMetadata,
        );
    }
}