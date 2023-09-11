/* eslint-disable key-spacing */
import { CommonUpsertAdministrativeAreaLevel2Command } from '@app/common/administrative-area-level-2';
import { CommonUpsertAdministrativeAreaLevel2Service } from '@app/common/administrative-area-level-2/application/upsert/common-upsert-administrative-area-level-2.service';
import {
    CommonAdministrativeAreaLevel2AdministrativeAreaLevel1Id,
    CommonAdministrativeAreaLevel2Code,
    CommonAdministrativeAreaLevel2CountryId,
    CommonAdministrativeAreaLevel2CustomCode,
    CommonAdministrativeAreaLevel2Id,
    CommonAdministrativeAreaLevel2Latitude,
    CommonAdministrativeAreaLevel2Longitude,
    CommonAdministrativeAreaLevel2MapType,
    CommonAdministrativeAreaLevel2Name,
    CommonAdministrativeAreaLevel2Slug,
    CommonAdministrativeAreaLevel2Zoom,
} from '@app/common/administrative-area-level-2/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonUpsertAdministrativeAreaLevel2Command)
export class CommonUpsertAdministrativeAreaLevel2CommandHandler implements ICommandHandler<CommonUpsertAdministrativeAreaLevel2Command>
{
    constructor(
        private readonly upsertAdministrativeAreaLevel2Service: CommonUpsertAdministrativeAreaLevel2Service,
    ) {}

    async execute(command: CommonUpsertAdministrativeAreaLevel2Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.upsertAdministrativeAreaLevel2Service.main(
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
