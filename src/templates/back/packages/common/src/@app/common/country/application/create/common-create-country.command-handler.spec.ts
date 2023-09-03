import { CommonCreateCountryCommandHandler } from './common-create-country.command-handler';
import { CommonCreateCountryService } from './common-create-country.service';
import { CommonCreateCountryCommand, commonMockCountryData } from '@app/common/country';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateCountryCommandHandler', () =>
{
    let commandHandler: CommonCreateCountryCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateCountryCommandHandler,
                {
                    provide : CommonCreateCountryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<CommonCreateCountryCommandHandler>(CommonCreateCountryCommandHandler);
    });

    describe('main', () =>
    {
        test('CreateCountryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the CommonCreateCountryService', async () =>
        {
            expect(await commandHandler.execute(
                new CommonCreateCountryCommand(
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
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
