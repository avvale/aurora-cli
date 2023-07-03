import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonUpdateCountriesCommandHandler } from './common-update-countries.command-handler';
import { CommonUpdateCountriesCommand } from './common-update-countries.command';
import { CommonUpdateCountriesService } from './common-update-countries.service';

describe('CommonUpdateCountriesCommandHandler', () =>
{
    let commandHandler: CommonUpdateCountriesCommandHandler;
    let service: CommonUpdateCountriesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateCountriesCommandHandler,
                {
                    provide : CommonUpdateCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateCountriesCommandHandler>(CommonUpdateCountriesCommandHandler);
        service = module.get<CommonUpdateCountriesService>(CommonUpdateCountriesService);
    });

    describe('main', () =>
    {
        test('UpdateCountriesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an countries updated', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateCountriesCommand(
                    {
                        id: commonMockCountryData[0].id,
                        iso3166Alpha2: commonMockCountryData[0].iso3166Alpha2,
                        iso3166Alpha3: commonMockCountryData[0].iso3166Alpha3,
                        iso3166Numeric: commonMockCountryData[0].iso3166Numeric,
                        customCode: commonMockCountryData[0].customCode,
                        prefix: commonMockCountryData[0].prefix,
                        image: commonMockCountryData[0].image,
                        sort: commonMockCountryData[0].sort,
                        administrativeAreas: commonMockCountryData[0].administrativeAreas,
                        latitude: commonMockCountryData[0].latitude,
                        longitude: commonMockCountryData[0].longitude,
                        zoom: commonMockCountryData[0].zoom,
                        mapType: commonMockCountryData[0].mapType,
                        langId: commonMockCountryData[0].langId,
                        name: commonMockCountryData[0].name,
                        slug: commonMockCountryData[0].slug,
                        administrativeAreaLevel1: commonMockCountryData[0].administrativeAreaLevel1,
                        administrativeAreaLevel2: commonMockCountryData[0].administrativeAreaLevel2,
                        administrativeAreaLevel3: commonMockCountryData[0].administrativeAreaLevel3,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});