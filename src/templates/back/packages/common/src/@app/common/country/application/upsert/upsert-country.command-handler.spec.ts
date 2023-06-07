import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { UpsertCountryCommandHandler } from './upsert-country.command-handler';
import { UpsertCountryCommand } from './upsert-country.command';
import { UpsertCountryService } from './upsert-country.service';

describe('UpsertCountryCommandHandler', () =>
{
    let commandHandler: UpsertCountryCommandHandler;
    let service: UpsertCountryService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpsertCountryCommandHandler,
                {
                    provide : UpsertCountryService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpsertCountryCommandHandler>(UpsertCountryCommandHandler);
        service = module.get<UpsertCountryService>(UpsertCountryService);
    });

    describe('main', () =>
    {
        test('UpsertCountryCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the UpsertCountryService', async () =>
        {
            expect(await commandHandler.execute(
                new UpsertCountryCommand(
                    {
                        id: countries[0].id,
                        iso3166Alpha2: countries[0].iso3166Alpha2,
                        iso3166Alpha3: countries[0].iso3166Alpha3,
                        iso3166Numeric: countries[0].iso3166Numeric,
                        customCode: countries[0].customCode,
                        prefix: countries[0].prefix,
                        image: countries[0].image,
                        sort: countries[0].sort,
                        administrativeAreas: countries[0].administrativeAreas,
                        latitude: countries[0].latitude,
                        longitude: countries[0].longitude,
                        zoom: countries[0].zoom,
                        mapType: countries[0].mapType,
                        langId: countries[0].langId,
                        name: countries[0].name,
                        slug: countries[0].slug,
                        administrativeAreaLevel1: countries[0].administrativeAreaLevel1,
                        administrativeAreaLevel2: countries[0].administrativeAreaLevel2,
                        administrativeAreaLevel3: countries[0].administrativeAreaLevel3,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});