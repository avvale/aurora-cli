/* eslint-disable key-spacing */
import { CommonCreateCountryCommand } from '@app/common/country';
import { CommonCreateCountryService } from '@app/common/country/application/create/common-create-country.service';
import {
    CommonCountryAdministrativeAreas,
    CommonCountryAvailableLangs,
    CommonCountryCustomCode,
    CommonCountryI18nAdministrativeAreaLevel1,
    CommonCountryI18nAdministrativeAreaLevel2,
    CommonCountryI18nAdministrativeAreaLevel3,
    CommonCountryI18nLangId,
    CommonCountryI18nName,
    CommonCountryI18nSlug,
    CommonCountryId,
    CommonCountryImage,
    CommonCountryIso3166Alpha2,
    CommonCountryIso3166Alpha3,
    CommonCountryIso3166Numeric,
    CommonCountryLatitude,
    CommonCountryLongitude,
    CommonCountryMapType,
    CommonCountryPrefix,
    CommonCountrySort,
    CommonCountryZoom,
} from '@app/common/country/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CommonCreateCountryCommand)
export class CommonCreateCountryCommandHandler implements ICommandHandler<CommonCreateCountryCommand>
{
    constructor(
        private readonly createCountryService: CommonCreateCountryService,
    ) {}

    async execute(command: CommonCreateCountryCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCountryService.main(
            {
                id: new CommonCountryId(command.payload.id),
                iso3166Alpha2: new CommonCountryIso3166Alpha2(command.payload.iso3166Alpha2),
                iso3166Alpha3: new CommonCountryIso3166Alpha3(command.payload.iso3166Alpha3),
                iso3166Numeric: new CommonCountryIso3166Numeric(command.payload.iso3166Numeric),
                customCode: new CommonCountryCustomCode(command.payload.customCode),
                prefix: new CommonCountryPrefix(command.payload.prefix),
                image: new CommonCountryImage(command.payload.image),
                sort: new CommonCountrySort(command.payload.sort),
                administrativeAreas: new CommonCountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CommonCountryLatitude(command.payload.latitude),
                longitude: new CommonCountryLongitude(command.payload.longitude),
                zoom: new CommonCountryZoom(command.payload.zoom),
                mapType: new CommonCountryMapType(command.payload.mapType),
                langId: new CommonCountryI18nLangId(command.payload.langId),
                name: new CommonCountryI18nName(command.payload.name),
                slug: new CommonCountryI18nSlug(command.payload.slug),
                administrativeAreaLevel1: new CommonCountryI18nAdministrativeAreaLevel1(command.payload.administrativeAreaLevel1),
                administrativeAreaLevel2: new CommonCountryI18nAdministrativeAreaLevel2(command.payload.administrativeAreaLevel2),
                administrativeAreaLevel3: new CommonCountryI18nAdministrativeAreaLevel3(command.payload.administrativeAreaLevel3),
            },
            command.cQMetadata,
        );
    }
}
