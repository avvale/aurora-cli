import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateCountriesController } from './common-create-countries.controller';
import { CommonCreateCountriesHandler } from '../handlers/common-create-countries.handler';

// sources
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonCreateCountriesController', () =>
{
    let controller: CommonCreateCountriesController;
    let handler: CommonCreateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateCountriesController,
            ],
            providers: [
                {
                    provide : CommonCreateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateCountriesController>(CommonCreateCountriesController);
        handler = module.get<CommonCreateCountriesHandler>(CommonCreateCountriesHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an countries created', async () =>
        {
            expect(await controller.main(countries)).toBe(undefined);
        });
    });
});