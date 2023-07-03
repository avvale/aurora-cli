/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateAdministrativeAreasLevel1Command } from './common-update-administrative-areas-level-1.command';
import { CommonUpdateAdministrativeAreasLevel1Service } from './common-update-administrative-areas-level-1.service';
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

@CommandHandler(CommonUpdateAdministrativeAreasLevel1Command)
export class CommonUpdateAdministrativeAreasLevel1CommandHandler implements ICommandHandler<CommonUpdateAdministrativeAreasLevel1Command>
{
    constructor(
        private readonly updateAdministrativeAreasLevel1Service: CommonUpdateAdministrativeAreasLevel1Service,
    ) {}

    async execute(command: CommonUpdateAdministrativeAreasLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreasLevel1Service.main(
            {
                id: new CommonAdministrativeAreaLevel1Id(command.payload.id, { undefinable: true }),
                countryId: new CommonAdministrativeAreaLevel1CountryId(command.payload.countryId, { undefinable: true }),
                code: new CommonAdministrativeAreaLevel1Code(command.payload.code, { undefinable: true }),
                customCode: new CommonAdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new CommonAdministrativeAreaLevel1Name(command.payload.name, { undefinable: true }),
                slug: new CommonAdministrativeAreaLevel1Slug(command.payload.slug, { undefinable: true }),
                latitude: new CommonAdministrativeAreaLevel1Latitude(command.payload.latitude),
                longitude: new CommonAdministrativeAreaLevel1Longitude(command.payload.longitude),
                zoom: new CommonAdministrativeAreaLevel1Zoom(command.payload.zoom),
                mapType: new CommonAdministrativeAreaLevel1MapType(command.payload.mapType, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}