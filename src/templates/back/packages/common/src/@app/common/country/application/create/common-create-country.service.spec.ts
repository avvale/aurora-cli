/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { CreateCountryService } from './create-country.service';
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
import { CommonICountryRepository } from '../../domain/common-country.repository';
import { ICountryI18nRepository } from '../../domain/country-i18n.repository';
import { MockCountryRepository } from '../../infrastructure/mock/mock-country.repository';

describe('CommonCreateCountryService', () =>

{
    let service: CreateCountryService;
    let repository: CommonICountryRepository;
    let repositoryI18n: ICountryI18nRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateCountryService,
                MockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
                {
                    provide : ICountryI18nRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CreateCountryService);
        repository = module.get(CommonICountryRepository);
        repositoryI18n = module.get(ICountryI18nRepository);
        mockRepository = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('CreateCountryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a country and emit event', async () =>
        {
            expect(await service.main(
                {
                    id: new CommonCountryId(countries[0].id),
                    iso3166Alpha2: new CommonCountryIso3166Alpha2(countries[0].iso3166Alpha2),
                    iso3166Alpha3: new CommonCountryIso3166Alpha3(countries[0].iso3166Alpha3),
                    iso3166Numeric: new CommonCountryIso3166Numeric(countries[0].iso3166Numeric),
                    customCode: new CommonCountryCustomCode(countries[0].customCode),
                    prefix: new CommonCountryPrefix(countries[0].prefix),
                    image: new CommonCountryImage(countries[0].image),
                    sort: new CommonCountrySort(countries[0].sort),
                    administrativeAreas: new CommonCountryAdministrativeAreas(countries[0].administrativeAreas),
                    latitude: new CommonCountryLatitude(countries[0].latitude),
                    longitude: new CommonCountryLongitude(countries[0].longitude),
                    zoom: new CommonCountryZoom(countries[0].zoom),
                    mapType: new CommonCountryMapType(countries[0].mapType),
                    langId: new CommonCountryI18nLangId(countries[0].langId),
                    name: new CommonCountryI18nName(countries[0].name),
                    slug: new CommonCountryI18nSlug(countries[0].slug),
                    administrativeAreaLevel1: new CommonCountryI18nAdministrativeAreaLevel1(countries[0].administrativeAreaLevel1),
                    administrativeAreaLevel2: new CommonCountryI18nAdministrativeAreaLevel2(countries[0].administrativeAreaLevel2),
                    administrativeAreaLevel3: new CommonCountryI18nAdministrativeAreaLevel3(countries[0].administrativeAreaLevel3),
                },
            )).toBe(undefined);
        });
    });
});