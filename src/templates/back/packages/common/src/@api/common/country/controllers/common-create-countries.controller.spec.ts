import { CommonCreateCountriesController, CommonCreateCountriesHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { Test, TestingModule } from '@nestjs/testing';

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

        test('should return an commonMockCountryData created', async () =>
        {
            expect(await controller.main(commonMockCountryData)).toBe(undefined);
        });
    });
});