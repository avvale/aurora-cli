/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonUpsertCountryController } from './common-upsert-country.controller';
import { CommonUpsertCountryHandler } from '../handlers/common-upsert-country.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/mock/mock-country.data';

describe('CommonUpsertCountryController', () =>
{
    let controller: CommonUpsertCountryController;
    let handler: CommonUpsertCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonUpsertCountryController,
            ],
            providers: [
                {
                    provide : CommonUpsertCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpsertCountryController>(CommonUpsertCountryController);
        handler = module.get<CommonUpsertCountryHandler>(CommonUpsertCountryHandler);
    });

    describe('main', () =>
    {
        test('CommonUpsertCountryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await controller.main(countries[0])).toBe(countries[0]);
        });
    });
});