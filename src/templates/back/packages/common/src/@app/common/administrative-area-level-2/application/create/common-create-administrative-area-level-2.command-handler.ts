/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateAdministrativeAreaLevel2Command } from './common-create-administrative-area-level-2.command';
import { CommonCreateAdministrativeAreaLevel2Service } from './common-create-administrative-area-level-2.service';
import {
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2Zoom,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2CreatedAt,
    CommonAdministrativeAreaLevel2UpdatedAt,
    CommonAdministrativeAreaLevel2DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CommonCreateAdministrativeAreaLevel2Command)
export class CommonCreateAdministrativeAreaLevel2CommandHandler implements ICommandHandler<CommonCreateAdministrativeAreaLevel2Command>
{
    constructor(
        private readonly createAdministrativeAreaLevel2Service: CommonCreateAdministrativeAreaLevel2Service,
    ) {}

    async execute(command: CommonCreateAdministrativeAreaLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreaLevel2Service.main(
            {
                id: new CommonAdministrativeAreaLevel2Id(command.payload.id),
                countryId: new CommonAdministrativeAreaLevel2CountryId(command.payload.countryId),
                administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id),
                code: new CommonAdministrativeAreaLevel2Code(command.payload.code),
                customCode: new CommonAdministrativeAreaLevel2CustomCode(command.payload.customCode),
                name: new CommonAdministrativeAreaLevel2Name(command.payload.name),
                slug: new CommonAdministrativeAreaLevel2Slug(command.payload.slug),
                latitude: new CommonAdministrativeAreaLevel2Latitude(command.payload.latitude),
                longitude: new CommonAdministrativeAreaLevel2Longitude(command.payload.longitude),
                zoom: new CommonAdministrativeAreaLevel2Zoom(command.payload.zoom),
                mapType: new CommonAdministrativeAreaLevel2MapType(command.payload.mapType),
            },
            command.cQMetadata,
        );
    }
}