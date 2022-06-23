/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAdministrativeAreaLevel1ByIdCommand } from './update-administrative-area-level-1-by-id.command';
import { UpdateAdministrativeAreaLevel1ByIdService } from './update-administrative-area-level-1-by-id.service';
import {
    AdministrativeAreaLevel1Id,
    AdministrativeAreaLevel1CountryId,
    AdministrativeAreaLevel1Code,
    AdministrativeAreaLevel1CustomCode,
    AdministrativeAreaLevel1Name,
    AdministrativeAreaLevel1Slug,
    AdministrativeAreaLevel1Latitude,
    AdministrativeAreaLevel1Longitude,
    AdministrativeAreaLevel1Zoom,
    AdministrativeAreaLevel1CreatedAt,
    AdministrativeAreaLevel1UpdatedAt,
    AdministrativeAreaLevel1DeletedAt,
} from '../../domain/value-objects';

@CommandHandler(UpdateAdministrativeAreaLevel1ByIdCommand)
export class UpdateAdministrativeAreaLevel1ByIdCommandHandler implements ICommandHandler<UpdateAdministrativeAreaLevel1ByIdCommand>
{
    constructor(
        private readonly updateAdministrativeAreaLevel1ByIdService: UpdateAdministrativeAreaLevel1ByIdService,
    ) {}

    async execute(command: UpdateAdministrativeAreaLevel1ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel1ByIdService.main(
            {
                id: new AdministrativeAreaLevel1Id(command.payload.id),
                countryId: new AdministrativeAreaLevel1CountryId(command.payload.countryId, { undefinable: true }),
                code: new AdministrativeAreaLevel1Code(command.payload.code, { undefinable: true }),
                customCode: new AdministrativeAreaLevel1CustomCode(command.payload.customCode),
                name: new AdministrativeAreaLevel1Name(command.payload.name, { undefinable: true }),
                slug: new AdministrativeAreaLevel1Slug(command.payload.slug, { undefinable: true }),
                latitude: new AdministrativeAreaLevel1Latitude(command.payload.latitude),
                longitude: new AdministrativeAreaLevel1Longitude(command.payload.longitude),
                zoom: new AdministrativeAreaLevel1Zoom(command.payload.zoom),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}