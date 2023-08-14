import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';
import { CommonUpdateCountryByIdCommandHandler } from './common-update-country-by-id.command-handler';
import { CommonUpdateCountryByIdCommand } from './common-update-country-by-id.command';
import { CommonUpdateCountryByIdService } from './common-update-country-by-id.service';

describe('CommonUpdateCountryByIdCommandHandler', () =>
{
    let commandHandler: CommonUpdateCountryByIdCommandHandler;
    let service: CommonUpdateCountryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateCountryByIdCommandHandler,
                {
                    provide : CommonUpdateCountryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonUpdateCountryByIdCommandHandler>(CommonUpdateCountryByIdCommandHandler);
        service = module.get<CommonUpdateCountryByIdService>(CommonUpdateCountryByIdService);
    });

    describe('main', () =>
    {
        test('UpdateCountryByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an country created', async () =>
        {
            expect(await commandHandler.execute(
                new CommonUpdateCountryByIdCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
