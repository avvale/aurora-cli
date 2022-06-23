/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreaLevel2ByIdCommand } from './update-administrative-area-level-2-by-id.command';
import { UpdateAdministrativeAreaLevel2ByIdService } from './update-administrative-area-level-2-by-id.service';
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

@CommandHandler(UpdateAdministrativeAreaLevel2ByIdCommand)
export class UpdateAdministrativeAreaLevel2ByIdCommandHandler implements ICommandHandler<UpdateAdministrativeAreaLevel2ByIdCommand>
{
    constructor(
        private readonly updateAdministrativeAreaLevel2ByIdService: UpdateAdministrativeAreaLevel2ByIdService,
    ) {}

    async execute(command: UpdateAdministrativeAreaLevel2ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel2ByIdService.main(
            {
                id: new AdministrativeAreaLevel2Id(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}