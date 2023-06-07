/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { UpsertCountryService } from './upsert-country.service';
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
    CountryMapType,
    CountryAvailableLangs,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18nLangId,
    CountryI18nName,
    CountryI18nSlug,
    CountryI18nAdministrativeAreaLevel1,
    CountryI18nAdministrativeAreaLevel2,
    CountryI18nAdministrativeAreaLevel3,
} from '../../domain/value-objects';
import { ICountryRepository } from '../../domain/country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('UpsertCountryService', () =>

{
    let service: UpsertCountryService;
    let repository: ICountryRepository;
    let repositoryI18n: ICountryI18nRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UpsertCountryService,
                MockCountryRepository,
                {
                    provide : ICountryRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
                {
                    provide : ICountryI18nRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(UpsertCountryService);
        repository = module.get(ICountryRepository);
        repositoryI18n = module.get(ICountryI18nRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('UpsertCountryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a country and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new CountryId(countries[0].id),
                    iso3166Alpha2: new CountryIso3166Alpha2(countries[0].iso3166Alpha2),
                    iso3166Alpha3: new CountryIso3166Alpha3(countries[0].iso3166Alpha3),
                    iso3166Numeric: new CountryIso3166Numeric(countries[0].iso3166Numeric),
                    customCode: new CountryCustomCode(countries[0].customCode),
                    prefix: new CountryPrefix(countries[0].prefix),
                    image: new CountryImage(countries[0].image),
                    sort: new CountrySort(countries[0].sort),
                    administrativeAreas: new CountryAdministrativeAreas(countries[0].administrativeAreas),
                    latitude: new CountryLatitude(countries[0].latitude),
                    longitude: new CountryLongitude(countries[0].longitude),
                    zoom: new CountryZoom(countries[0].zoom),
                    mapType: new CountryMapType(countries[0].mapType),
                    availableLangs: new CountryAvailableLangs(countries[0].availableLangs),
                    langId: new CountryI18nLangId(countries[0].langId),
                    name: new CountryI18nName(countries[0].name),
                    slug: new CountryI18nSlug(countries[0].slug),
                    administrativeAreaLevel1: new CountryI18nAdministrativeAreaLevel1(countries[0].administrativeAreaLevel1),
                    administrativeAreaLevel2: new CountryI18nAdministrativeAreaLevel2(countries[0].administrativeAreaLevel2),
                    administrativeAreaLevel3: new CountryI18nAdministrativeAreaLevel3(countries[0].administrativeAreaLevel3),
                },
            )).toBe(undefined);
        });
    });
});