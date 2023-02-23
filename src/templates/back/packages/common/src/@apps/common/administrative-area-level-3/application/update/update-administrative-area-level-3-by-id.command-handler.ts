/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreaLevel3ByIdCommand } from './update-administrative-area-level-3-by-id.command';
import { UpdateAdministrativeAreaLevel3ByIdService } from './update-administrative-area-level-3-by-id.service';
import {
    AdministrativeAreaLevel3Id,
    AdministrativeAreaLevel3CountryId,
    AdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    AdministrativeAreaLevel3Code,
    AdministrativeAreaLevel3CustomCode,
    AdministrativeAreaLevel3Name,
    AdministrativeAreaLevel3Slug,
    AdministrativeAreaLevel3Latitude,
    AdministrativeAreaLevel3Longitude,
    AdministrativeAreaLevel3Zoom,
    AdministrativeAreaLevel3CreatedAt,
    AdministrativeAreaLevel3UpdatedAt,
    AdministrativeAreaLevel3DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAdministrativeAreaLevel3ByIdCommand)
export class UpdateAdministrativeAreaLevel3ByIdCommandHandler implements ICommandHandler<UpdateAdministrativeAreaLevel3ByIdCommand>
{
    constructor(
        private readonly updateAdministrativeAreaLevel3ByIdService: UpdateAdministrativeAreaLevel3ByIdService,
    ) {}

    async execute(command: UpdateAdministrativeAreaLevel3ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel3ByIdService.main(
            {
                id: new AdministrativeAreaLevel3Id(command.payload.id),
                countryId: new AdministrativeAreaLevel3CountryId(command.payload.countryId, { undefinable: true }),
                administrativeAreaLevel1Id: new AdministrativeAreaLevel3AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id, { undefinable: true }),
                administrativeAreaLevel2Id: new AdministrativeAreaLevel3AdministrativeAreaLevel2Id(command.payload.administrativeAreaLevel2Id, { undefinable: true }),
                code: new AdministrativeAreaLevel3Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel3CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel3Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel3Slug(command.payload.slug, { undefinable: true }),
                latitude: new AdministrativeAreaLevel3Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel3Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel3Zoom(command.payload.zoom),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}