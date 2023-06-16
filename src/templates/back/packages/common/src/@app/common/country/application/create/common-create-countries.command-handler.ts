/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommonCreateCountriesCommand } from './common-create-countries.command';
import { CommonCreateCountriesService } from './common-create-countries.service';
import {
    CommonCountryId,
    CommonCountryIso3166Alpha2,
    CommonCountryIso3166Alpha3,
    CommonCountryIso3166Numeric,
    CommonCountryCustomCode,
    CommonCountryPrefix,
    CommonCountryImage,
    CommonCountrySort,
    CommonCountryAdministrativeAreas,
    CommonCountryLatitude,
    CommonCountryLongitude,
    CommonCountryZoom,
    CommonCountryMapType,
    CommonCountryAvailableLangs,
    CommonCountryCreatedAt,
    CommonCountryUpdatedAt,
    CommonCountryDeletedAt,
    CommonCountryI18nLangId,
    CommonCountryI18nName,
    CommonCountryI18nSlug,
    CommonCountryI18nAdministrativeAreaLevel1,
    CommonCountryI18nAdministrativeAreaLevel2,
    CommonCountryI18nAdministrativeAreaLevel3,
} from '../../domain/value-objects';

@CommandHandler(CommonCreateCountriesCommand)
export class CommonCreateCountriesCommandHandler implements ICommandHandler<CommonCreateCountriesCommand>
{
    constructor(
        private readonly createCountriesService: CommonCreateCountriesService,
    ) {}

    async execute(command: CommonCreateCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCountriesService.main(
            command.payload
                .map(country =>
                {
                    return {
                        id: new CommonCountryId(country.id),
                        iso3166Alpha2: new CommonCountryIso3166Alpha2(country.iso3166Alpha2),
                        iso3166Alpha3: new CommonCountryIso3166Alpha3(country.iso3166Alpha3),
                        iso3166Numeric: new CommonCountryIso3166Numeric(country.iso3166Numeric),
                        customCode: new CommonCountryCustomCode(country.customCode),
                        prefix: new CommonCountryPrefix(country.prefix),
                        image: new CommonCountryImage(country.image),
                        sort: new CommonCountrySort(country.sort),
                        administrativeAreas: new CommonCountryAdministrativeAreas(country.administrativeAreas),
                        latitude: new CommonCountryLatitude(country.latitude),
                        longitude: new CommonCountryLongitude(country.longitude),
                        zoom: new CommonCountryZoom(country.zoom),
                        mapType: new CommonCountryMapType(country.mapType),
                        availableLangs: new CommonCountryAvailableLangs(country.availableLangs),
                        langId: new CommonCountryI18nLangId(country.langId),
                        name: new CommonCountryI18nName(country.name),
                        slug: new CommonCountryI18nSlug(country.slug),
                        administrativeAreaLevel1: new CommonCountryI18nAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                        administrativeAreaLevel2: new CommonCountryI18nAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                        administrativeAreaLevel3: new CommonCountryI18nAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                    };
                }),
            command.cQMetadata,
        );
    }
}