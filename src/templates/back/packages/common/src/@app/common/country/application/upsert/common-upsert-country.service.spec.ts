/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonICountryI18nRepository, CommonICountryRepository, commonMockCountryData, CommonMockCountryRepository } from '@app/common/country';
import { CommonUpsertCountryService } from '@app/common/country/application/upsert/common-upsert-country.service';
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
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertCountryService', () =>

{
    let service: CommonUpsertCountryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                CommonUpsertCountryService,
                CommonMockCountryRepository,
                {
                    provide : CommonICountryRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
                {
                    provide : CommonICountryI18nRepository,
                    useValue: {
                        upsert: () => { /**/ },
                        find  : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(CommonUpsertCountryService);
    });

    describe('main', () =>
    {
        test('CommonUpsertCountryService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a country and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new CommonCountryId(commonMockCountryData[0].id),
                        iso3166Alpha2: new CommonCountryIso3166Alpha2(commonMockCountryData[0].iso3166Alpha2),
                        iso3166Alpha3: new CommonCountryIso3166Alpha3(commonMockCountryData[0].iso3166Alpha3),
                        iso3166Numeric: new CommonCountryIso3166Numeric(commonMockCountryData[0].iso3166Numeric),
                        customCode: new CommonCountryCustomCode(commonMockCountryData[0].customCode),
                        prefix: new CommonCountryPrefix(commonMockCountryData[0].prefix),
                        image: new CommonCountryImage(commonMockCountryData[0].image),
                        sort: new CommonCountrySort(commonMockCountryData[0].sort),
                        administrativeAreas: new CommonCountryAdministrativeAreas(commonMockCountryData[0].administrativeAreas),
                        latitude: new CommonCountryLatitude(commonMockCountryData[0].latitude),
                        longitude: new CommonCountryLongitude(commonMockCountryData[0].longitude),
                        zoom: new CommonCountryZoom(commonMockCountryData[0].zoom),
                        mapType: new CommonCountryMapType(commonMockCountryData[0].mapType),
                        langId: new CommonCountryI18nLangId(commonMockCountryData[0].langId),
                        name: new CommonCountryI18nName(commonMockCountryData[0].name),
                        slug: new CommonCountryI18nSlug(commonMockCountryData[0].slug),
                        administrativeAreaLevel1: new CommonCountryI18nAdministrativeAreaLevel1(commonMockCountryData[0].administrativeAreaLevel1),
                        administrativeAreaLevel2: new CommonCountryI18nAdministrativeAreaLevel2(commonMockCountryData[0].administrativeAreaLevel2),
                        administrativeAreaLevel3: new CommonCountryI18nAdministrativeAreaLevel3(commonMockCountryData[0].administrativeAreaLevel3),
                    },
                    {
                        meta: {
                            contentLanguage: {
                                id        : '7c4754e7-3363-48ca-af99-632522226b51',
                                name      : 'English',
                                image     : 'us',
                                iso6392   : 'en',
                                iso6393   : 'eng',
                                ietf      : 'en-US',
                                customCode: null,
                                dir       : 'RTL',
                                sort      : 0,
                                isActive  : true,
                            },
                        },
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
