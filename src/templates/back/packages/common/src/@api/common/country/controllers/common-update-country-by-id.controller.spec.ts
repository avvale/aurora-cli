/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonUpdateCountryByIdController } from './common-update-country-by-id.controller';
import { CommonUpdateCountryByIdHandler } from '../handlers/common-update-country-by-id.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonUpdateCountryByIdController', () =>
{
    let controller: CommonUpdateCountryByIdController;
    let handler: CommonUpdateCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonUpdateCountryByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateCountryByIdController>(CommonUpdateCountryByIdController);
        handler = module.get<CommonUpdateCountryByIdHandler>(CommonUpdateCountryByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateCountryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a country updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await controller.main(countries[0])).toBe(countries[0]);
        });
    });
});