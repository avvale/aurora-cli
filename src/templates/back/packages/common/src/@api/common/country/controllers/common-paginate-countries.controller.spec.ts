/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonPaginateCountriesController } from './common-paginate-countries.controller';
import { CommonPaginateCountriesHandler } from '../handlers/common-paginate-countries.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonPaginateCountriesController', () =>
{
    let controller: CommonPaginateCountriesController;
    let handler: CommonPaginateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonPaginateCountriesController,
            ],
            providers: [
                {
                    provide : CommonPaginateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateCountriesController>(CommonPaginateCountriesController);
        handler = module.get<CommonPaginateCountriesHandler>(CommonPaginateCountriesHandler);
    });

    describe('main', () =>
    {
        test('CommonPaginateCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a countries', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : countries,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : countries,
            });
        });
    });
});