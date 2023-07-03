/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonUpdateAdministrativeAreaLevel2ByIdCommand } from './common-update-administrative-area-level-2-by-id.command';
import { CommonUpdateAdministrativeAreaLevel2ByIdService } from './common-update-administrative-area-level-2-by-id.service';
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

@CommandHandler(CommonUpdateAdministrativeAreaLevel2ByIdCommand)
export class CommonUpdateAdministrativeAreaLevel2ByIdCommandHandler implements ICommandHandler<CommonUpdateAdministrativeAreaLevel2ByIdCommand>
{
    constructor(
        private readonly updateAdministrativeAreaLevel2ByIdService: CommonUpdateAdministrativeAreaLevel2ByIdService,
    ) {}

    async execute(command: CommonUpdateAdministrativeAreaLevel2ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel2ByIdService.main(
            {
                id: new CommonAdministrativeAreaLevel2Id(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}