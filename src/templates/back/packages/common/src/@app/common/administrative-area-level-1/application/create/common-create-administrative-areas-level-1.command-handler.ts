/* eslint-disable key-spacing */
import { CommonCreateAdministrativeAreasLevel1Command } from '@app/common/administrative-area-level-1';
import { CommonCreateAdministrativeAreasLevel1Service } from '@app/common/administrative-area-level-1/application/create/common-create-administrative-areas-level-1.service';
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

@CommandHandler(CommonCreateAdministrativeAreasLevel1Command)
export class CommonCreateAdministrativeAreasLevel1CommandHandler implements ICommandHandler<CommonCreateAdministrativeAreasLevel1Command>
{
    constructor(
        private readonly createAdministrativeAreasLevel1Service: CommonCreateAdministrativeAreasLevel1Service,
    ) {}

    async execute(command: CommonCreateAdministrativeAreasLevel1Command): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAdministrativeAreasLevel1Service.main(
            command.payload
                .map(administrativeAreaLevel1 =>
                {
                    return {
                        id: new CommonAdministrativeAreaLevel1Id(administrativeAreaLevel1.id),
                        countryId: new CommonAdministrativeAreaLevel1CountryId(administrativeAreaLevel1.countryId),
                        code: new CommonAdministrativeAreaLevel1Code(administrativeAreaLevel1.code),
                        customCode: new CommonAdministrativeAreaLevel1CustomCode(administrativeAreaLevel1.customCode),
                        name: new CommonAdministrativeAreaLevel1Name(administrativeAreaLevel1.name),
                        slug: new CommonAdministrativeAreaLevel1Slug(administrativeAreaLevel1.slug),
                        latitude: new CommonAdministrativeAreaLevel1Latitude(administrativeAreaLevel1.latitude),
                        longitude: new CommonAdministrativeAreaLevel1Longitude(administrativeAreaLevel1.longitude),
                        zoom: new CommonAdministrativeAreaLevel1Zoom(administrativeAreaLevel1.zoom),
                        mapType: new CommonAdministrativeAreaLevel1MapType(administrativeAreaLevel1.mapType),
                    };
                }),
            command.cQMetadata,
        );
    }
}
