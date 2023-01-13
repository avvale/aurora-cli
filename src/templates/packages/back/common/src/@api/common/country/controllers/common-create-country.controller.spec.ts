/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonCreateCountryController } from './common-create-country.controller';
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@app/common/country/infrastructure/seeds/country.seed';

describe('CommonCreateCountryController', () =>
{
    let controller: CommonCreateCountryController;
    let handler: CommonCreateCountryHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonCreateCountryController,
            ],
            providers: [
                {
                    provide : CommonCreateCountryHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateCountryController>(CommonCreateCountryController);
        handler = module.get<CommonCreateCountryHandler>(CommonCreateCountryHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateCountryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await controller.main(countries[0])).toBe(countries[0]);
        });
    });
});