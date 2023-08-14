/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateAdministrativeAreasLevel2Command } from './common-update-administrative-areas-level-2.command';
import { CommonUpdateAdministrativeAreasLevel2Service } from './common-update-administrative-areas-level-2.service';
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

@CommandHandler(CommonUpdateAdministrativeAreasLevel2Command)
export class CommonUpdateAdministrativeAreasLevel2CommandHandler implements ICommandHandler<CommonUpdateAdministrativeAreasLevel2Command>
{
    constructor(
        private readonly updateAdministrativeAreasLevel2Service: CommonUpdateAdministrativeAreasLevel2Service,
    ) {}

    async execute(command: CommonUpdateAdministrativeAreasLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreasLevel2Service.main(
            {
                id: new CommonAdministrativeAreaLevel2Id(command.payload.id, { undefinable: true }),
                countryId: new CommonAdministrativeAreaLevel2CountryId(command.payload.countryId, { undefinable: true }),
                administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id, { undefinable: true }),
                code: new CommonAdministrativeAreaLevel2Code(command.payload.code, { undefinable: true }),
                customCode: new CommonAdministrativeAreaLevel2CustomCode(command.payload.customCode),
                name: new CommonAdministrativeAreaLevel2Name(command.payload.name, { undefinable: true }),
                slug: new CommonAdministrativeAreaLevel2Slug(command.payload.slug, { undefinable: true }),
                latitude: new CommonAdministrativeAreaLevel2Latitude(command.payload.latitude),
                longitude: new CommonAdministrativeAreaLevel2Longitude(command.payload.longitude),
                zoom: new CommonAdministrativeAreaLevel2Zoom(command.payload.zoom),
                mapType: new CommonAdministrativeAreaLevel2MapType(command.payload.mapType, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
