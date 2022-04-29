/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountriesCommand } from './create-countries.command';
import { CreateCountriesService } from './create-countries.service';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18NLangId,
    CountryI18NName,
    CountryI18NSlug,
    CountryI18NAdministrativeAreaLevel1,
    CountryI18NAdministrativeAreaLevel2,
    CountryI18NAdministrativeAreaLevel3,
} from './../../domain/value-objects';

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesCommandHandler implements ICommandHandler<CreateCountriesCommand>
{
    constructor(
        private readonly createCountriesService: CreateCountriesService,
    ) {}

    async execute(command: CreateCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCountriesService.main(
            command.payload
                .map(country =>
                {
                    return {
                        id: new CountryId(country.id),
                        iso3166Alpha2: new CountryIso3166Alpha2(country.iso3166Alpha2),
                        iso3166Alpha3: new CountryIso3166Alpha3(country.iso3166Alpha3),
                        iso3166Numeric: new CountryIso3166Numeric(country.iso3166Numeric),
                        customCode: new CountryCustomCode(country.customCode),
                        prefix: new CountryPrefix(country.prefix),
                        image: new CountryImage(country.image),
                        sort: new CountrySort(country.sort),
                        administrativeAreas: new CountryAdministrativeAreas(country.administrativeAreas),
                        latitude: new CountryLatitude(country.latitude),
                        longitude: new CountryLongitude(country.longitude),
                        zoom: new CountryZoom(country.zoom),
                        dataLang: new CountryDataLang(country.dataLang),
                        langId: new CountryI18NLangId(country.langId),
                        name: new CountryI18NName(country.name),
                        slug: new CountryI18NSlug(country.slug),
                        administrativeAreaLevel1: new CountryI18NAdministrativeAreaLevel1(country.administrativeAreaLevel1),
                        administrativeAreaLevel2: new CountryI18NAdministrativeAreaLevel2(country.administrativeAreaLevel2),
                        administrativeAreaLevel3: new CountryI18NAdministrativeAreaLevel3(country.administrativeAreaLevel3),
                    };
                })
        );
    }
}