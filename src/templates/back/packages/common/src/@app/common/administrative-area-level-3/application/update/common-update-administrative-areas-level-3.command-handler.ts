/* eslint-disable key-spacing */
import { CommonUpdateAdministrativeAreasLevel3Command } from '@app/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreasLevel3Service } from '@app/common/administrative-area-level-3/application/update/common-update-administrative-areas-level-3.service';
import {
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel3Code,
    CommonAdministrativeAreaLevel3CountryId,
    CommonAdministrativeAreaLevel3CustomCode,
    CommonAdministrativeAreaLevel3Id,
    CommonAdministrativeAreaLevel3Latitude,
    CommonAdministrativeAreaLevel3Longitude,
    CommonAdministrativeAreaLevel3MapType,
    CommonAdministrativeAreaLevel3Name,
    CommonAdministrativeAreaLevel3Slug,
    CommonAdministrativeAreaLevel3Zoom,
} from '@app/common/administrative-area-level-3/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpdateAdministrativeAreasLevel3Command)
export class CommonUpdateAdministrativeAreasLevel3CommandHandler implements ICommandHandler<CommonUpdateAdministrativeAreasLevel3Command>
{
    constructor(
        private readonly updateAdministrativeAreasLevel3Service: CommonUpdateAdministrativeAreasLevel3Service,
    ) {}

    async execute(command: CommonUpdateAdministrativeAreasLevel3Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAdministrativeAreasLevel3Service.main(
            {
                id: new CommonAdministrativeAreaLevel3Id(command.payload.id, { undefinable: true }),
                countryId: new CommonAdministrativeAreaLevel3CountryId(command.payload.countryId, { undefinable: true }),
                administrativeAreaLevel1Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel1Id(command.payload.administrativeAreaLevel1Id, { undefinable: true }),
                administrativeAreaLevel2Id: new CommonAdministrativeAreaLevel3AdministrativeAreaLevel2Id(command.payload.administrativeAreaLevel2Id, { undefinable: true }),
                code: new CommonAdministrativeAreaLevel3Code(command.payload.code, { undefinable: true }),
                customCode: new CommonAdministrativeAreaLevel3CustomCode(command.payload.customCode),
                name: new CommonAdministrativeAreaLevel3Name(command.payload.name, { undefinable: true }),
                slug: new CommonAdministrativeAreaLevel3Slug(command.payload.slug, { undefinable: true }),
                latitude: new CommonAdministrativeAreaLevel3Latitude(command.payload.latitude),
                longitude: new CommonAdministrativeAreaLevel3Longitude(command.payload.longitude),
                zoom: new CommonAdministrativeAreaLevel3Zoom(command.payload.zoom),
                mapType: new CommonAdministrativeAreaLevel3MapType(command.payload.mapType, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
