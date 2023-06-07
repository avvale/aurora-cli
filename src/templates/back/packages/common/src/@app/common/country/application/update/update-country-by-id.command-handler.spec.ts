import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';
import { UpdateCountryByIdCommandHandler } from './update-country-by-id.command-handler';
import { UpdateCountryByIdCommand } from './update-country-by-id.command';
import { UpdateCountryByIdService } from './update-country-by-id.service';

describe('UpdateCountryByIdCommandHandler', () =>
{
    let commandHandler: UpdateCountryByIdCommandHandler;
    let service: UpdateCountryByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCountryByIdCommandHandler,
                {
                    provide : UpdateCountryByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<UpdateCountryByIdCommandHandler>(UpdateCountryByIdCommandHandler);
        service = module.get<UpdateCountryByIdService>(UpdateCountryByIdService);
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
                new UpdateCountryByIdCommand(
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
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});