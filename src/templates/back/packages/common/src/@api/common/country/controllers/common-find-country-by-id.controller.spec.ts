import { CommonFindCountryByIdController, CommonFindCountryByIdHandler } from '@api/common/country';
import { commonMockCountryData } from '@app/common/country';
import { CacheModule } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindCountryByIdController', () =>
{
    let controller: CommonFindCountryByIdController;
    let handler: CommonFindCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonFindCountryByIdController,
            ],
            providers: [
                {
                    provide : CommonFindCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindCountryByIdController>(CommonFindCountryByIdController);
        handler = module.get<CommonFindCountryByIdHandler>(CommonFindCountryByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindCountryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockCountryData[0])));
            expect(await controller.main(commonMockCountryData[0].id)).toBe(commonMockCountryData[0]);
        });
    });
});
