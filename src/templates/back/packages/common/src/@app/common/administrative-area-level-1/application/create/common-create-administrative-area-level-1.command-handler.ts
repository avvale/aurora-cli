/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateAdministrativeAreaLevel1Command } from './common-create-administrative-area-level-1.command';
import { CommonCreateAdministrativeAreaLevel1Service } from './common-create-administrative-area-level-1.service';
import {
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1Zoom,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1CreatedAt,
    CommonAdministrativeAreaLevel1UpdatedAt,
    CommonAdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CommonCreateAdministrativeAreaLevel1Command)
export class CommonCreateAdministrativeAreaLevel1CommandHandler implements ICommandHandler<CommonCreateAdministrativeAreaLevel1Command>
{
    constructor(
        private readonly createAdministrativeAreaLevel1Service: CommonCreateAdministrativeAreaLevel1Service,
    ) {}

    async execute(command: CommonCreateAdministrativeAreaLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreaLevel1Service.main(
            {
                id: new CommonAdministrativeAreaLevel1Id(command.payload.id),
                countryId: new CommonAdministrativeAreaLevel1CountryId(command.payload.countryId),
                code: new CommonAdministrativeAreaLevel1Code(command.payload.code),
                customCode: new CommonAdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new CommonAdministrativeAreaLevel1Name(command.payload.name),
                slug: new CommonAdministrativeAreaLevel1Slug(command.payload.slug),
                latitude: new CommonAdministrativeAreaLevel1Latitude(command.payload.latitude),
                longitude: new CommonAdministrativeAreaLevel1Longitude(command.payload.longitude),
                zoom: new CommonAdministrativeAreaLevel1Zoom(command.payload.zoom),
                mapType: new CommonAdministrativeAreaLevel1MapType(command.payload.mapType),
            },
            command.cQMetadata,
        );
    }
}
