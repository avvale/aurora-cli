/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

// custom items
import { CommonCreateCountryController } from './common-create-country.controller';
import { CommonCreateCountryHandler } from '../handlers/common-create-country.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/mock/mock-lang.data';
import { commonMockCountryData } from '@app/common/country/infrastructure/mock/common-mock-country.data';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main(commonMockCountryData[0])).toBe(commonMockCountryData[0]);
        });
    });
});