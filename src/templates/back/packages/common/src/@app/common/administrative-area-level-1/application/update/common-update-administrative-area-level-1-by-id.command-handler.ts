/* eslint-disable key-spacing */
import { CommonUpdateAdministrativeAreaLevel1ByIdCommand } from '@app/common/administrative-area-level-1';
import { CommonUpdateAdministrativeAreaLevel1ByIdService } from '@app/common/administrative-area-level-1/application/update/common-update-administrative-area-level-1-by-id.service';
import {
    CommonAdministrativeAreaLevel1Code,
    CommonAdministrativeAreaLevel1CountryId,
    CommonAdministrativeAreaLevel1CustomCode,
    CommonAdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel1Latitude,
    CommonAdministrativeAreaLevel1Longitude,
    CommonAdministrativeAreaLevel1MapType,
    CommonAdministrativeAreaLevel1Name,
    CommonAdministrativeAreaLevel1Slug,
    CommonAdministrativeAreaLevel1Zoom,
} from '@app/common/administrative-area-level-1/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateAdministrativeAreaLevel1ByIdCommand)
export class CommonUpdateAdministrativeAreaLevel1ByIdCommandHandler implements ICommandHandler<CommonUpdateAdministrativeAreaLevel1ByIdCommand>
{
    constructor(
        private readonly updateAdministrativeAreaLevel1ByIdService: CommonUpdateAdministrativeAreaLevel1ByIdService,
    ) {}

    async execute(command: CommonUpdateAdministrativeAreaLevel1ByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreaLevel1ByIdService.main(
            {
                id: new CommonAdministrativeAreaLevel1Id(command.payload.id),
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
            command.constraint,
            command.cQMetadata,
        );
    }
}
