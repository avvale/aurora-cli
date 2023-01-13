/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonGetCountriesController } from './common-get-countries.controller';
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/seeds/country.seed';

describe('CommonGetCountriesController', () =>
{
    let controller: CommonGetCountriesController;
    let handler: CommonGetCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonGetCountriesController,
            ],
            providers: [
                {
                    provide : CommonGetCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetCountriesController>(CommonGetCountriesController);
        handler = module.get<CommonGetCountriesHandler>(CommonGetCountriesHandler);
    });

    describe('main', () =>
    {
        test('CommonGetCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a countries', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await controller.main()).toBe(countries);
        });
    });
});