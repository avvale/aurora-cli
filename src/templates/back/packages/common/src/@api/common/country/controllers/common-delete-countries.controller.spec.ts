/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonDeleteCountriesController } from './common-delete-countries.controller';
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonDeleteCountriesController', () =>
{
    let controller: CommonDeleteCountriesController;
    let handler: CommonDeleteCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonDeleteCountriesController,
            ],
            providers: [
                {
                    provide : CommonDeleteCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteCountriesController>(CommonDeleteCountriesController);
        handler = module.get<CommonDeleteCountriesHandler>(CommonDeleteCountriesHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an countries deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await controller.main()).toBe(countries);
        });
    });
});