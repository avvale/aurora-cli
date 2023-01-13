import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { countries } from '@app/common/country/infrastructure/seeds/country.seed';
import { UpdateCountriesCommandHandler } from './update-countries.command-handler';
import { UpdateCountriesCommand } from './update-countries.command';
import { UpdateCountriesService } from './update-countries.service';

describe('UpdateCountriesCommandHandler', () =>
{
    let commandHandler: UpdateCountriesCommandHandler;
    let service: UpdateCountriesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateCountriesCommandHandler,
                {
                    provide : UpdateCountriesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateCountriesCommandHandler>(UpdateCountriesCommandHandler);
        service         = module.get<UpdateCountriesService>(UpdateCountriesService);
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
                new UpdateCountriesCommand(
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
                        langId: countries[0].langId,
                        name: countries[0].name,
                        slug: countries[0].slug,
                        administrativeAreaLevel1: countries[0].administrativeAreaLevel1,
                        administrativeAreaLevel2: countries[0].administrativeAreaLevel2,
                        administrativeAreaLevel3: countries[0].administrativeAreaLevel3,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});