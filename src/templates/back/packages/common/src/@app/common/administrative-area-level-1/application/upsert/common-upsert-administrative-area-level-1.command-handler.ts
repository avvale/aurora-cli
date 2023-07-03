/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpsertAdministrativeAreaLevel1Command } from './common-upsert-administrative-area-level-1.command';
import { CommonUpsertAdministrativeAreaLevel1Service } from './common-upsert-administrative-area-level-1.service';
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

@CommandHandler(CommonUpsertAdministrativeAreaLevel1Command)
export class CommonUpsertAdministrativeAreaLevel1CommandHandler implements ICommandHandler<CommonUpsertAdministrativeAreaLevel1Command>
{
    constructor(
        private readonly upsertAdministrativeAreaLevel1Service: CommonUpsertAdministrativeAreaLevel1Service,
    ) {}

    async execute(command: CommonUpsertAdministrativeAreaLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAdministrativeAreaLevel1Service.main(
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