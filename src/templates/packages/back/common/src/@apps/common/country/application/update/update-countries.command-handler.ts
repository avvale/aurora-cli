/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCountriesCommand } from './update-countries.command';
import { UpdateCountriesService } from './update-countries.service';
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
} from '../../domain/value-objects';

@CommandHandler(UpdateCountriesCommand)
export class UpdateCountriesCommandHandler implements ICommandHandler<UpdateCountriesCommand>
{
    constructor(
        private readonly updateCountriesService: UpdateCountriesService,
    ) {}

    async execute(command: UpdateCountriesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateCountriesService.main(
            {
                id: new CountryId(command.payload.id, { undefinable: true }),
                iso3166Alpha2: new CountryIso3166Alpha2(command.payload.iso3166Alpha2, { undefinable: true }),
                iso3166Alpha3: new CountryIso3166Alpha3(command.payload.iso3166Alpha3, { undefinable: true }),
                iso3166Numeric: new CountryIso3166Numeric(command.payload.iso3166Numeric, { undefinable: true }),
                customCode: new CountryCustomCode(command.payload.customCode),
                prefix: new CountryPrefix(command.payload.prefix),
                image: new CountryImage(command.payload.image),
                sort: new CountrySort(command.payload.sort),
                administrativeAreas: new CountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CountryLatitude(command.payload.latitude),
                longitude: new CountryLongitude(command.payload.longitude),
                zoom: new CountryZoom(command.payload.zoom),
                langId: new CountryI18NLangId(command.payload.langId, { undefinable: true }),
                name: new CountryI18NName(command.payload.name, { undefinable: true }),
                slug: new CountryI18NSlug(command.payload.slug, { undefinable: true }),
                administrativeAreaLevel1: new CountryI18NAdministrativeAreaLevel1(command.payload.administrativeAreaLevel1),
                administrativeAreaLevel2: new CountryI18NAdministrativeAreaLevel2(command.payload.administrativeAreaLevel2),
                administrativeAreaLevel3: new CountryI18NAdministrativeAreaLevel3(command.payload.administrativeAreaLevel3),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}