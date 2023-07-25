import { CommonGetAdministrativeAreasLevel1Controller, CommonGetAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonGetAdministrativeAreasLevel1Controller;
    let handler: CommonGetAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonGetAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetAdministrativeAreasLevel1Controller>(CommonGetAdministrativeAreasLevel1Controller);
        handler = module.get<CommonGetAdministrativeAreasLevel1Handler>(CommonGetAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a commonMockAdministrativeAreaLevel1Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data)));
            expect(await controller.main()).toBe(commonMockAdministrativeAreaLevel1Data);
        });
    });
});
