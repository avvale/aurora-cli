/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonGetCountriesController } from './common-get-countries.controller';
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

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

        test('should return a commonMockCountryData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData)));
            expect(await controller.main()).toBe(commonMockCountryData);
        });
    });
});