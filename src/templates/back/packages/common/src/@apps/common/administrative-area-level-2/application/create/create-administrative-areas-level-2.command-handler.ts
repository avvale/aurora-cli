/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAdministrativeAreasLevel2Command } from './create-administrative-areas-level-2.command';
import { CreateAdministrativeAreasLevel2Service } from './create-administrative-areas-level-2.service';
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

@CommandHandler(CreateAdministrativeAreasLevel2Command)
export class CreateAdministrativeAreasLevel2CommandHandler implements ICommandHandler<CreateAdministrativeAreasLevel2Command>
{
    constructor(
        private readonly createAdministrativeAreasLevel2Service: CreateAdministrativeAreasLevel2Service,
    ) {}

    async execute(command: CreateAdministrativeAreasLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreasLevel2Service.main(
            command.payload
                .map(administrativeAreaLevel2 =>
                {
                    return {
                        id: new AdministrativeAreaLevel2Id(administrativeAreaLevel2.id),
                        countryId: new AdministrativeAreaLevel2CountryId(administrativeAreaLevel2.countryId),
                        administrativeAreaLevel1Id: new AdministrativeAreaLevel2AdministrativeAreaLevel1Id(administrativeAreaLevel2.administrativeAreaLevel1Id),
                        code: new AdministrativeAreaLevel2Code(administrativeAreaLevel2.code),
                        customCode: new AdministrativeAreaLevel2CustomCode(administrativeAreaLevel2.customCode),
                        name: new AdministrativeAreaLevel2Name(administrativeAreaLevel2.name),
                        slug: new AdministrativeAreaLevel2Slug(administrativeAreaLevel2.slug),
                        latitude: new AdministrativeAreaLevel2Latitude(administrativeAreaLevel2.latitude),
                        longitude: new AdministrativeAreaLevel2Longitude(administrativeAreaLevel2.longitude),
                        zoom: new AdministrativeAreaLevel2Zoom(administrativeAreaLevel2.zoom),
                    };
                }),
            command.cQMetadata,
        );
    }
}