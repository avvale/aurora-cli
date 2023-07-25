import { CommonDeleteAdministrativeAreasLevel1Controller, CommonDeleteAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonDeleteAdministrativeAreasLevel1Controller;
    let handler: CommonDeleteAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreasLevel1Controller>(CommonDeleteAdministrativeAreasLevel1Controller);
        handler = module.get<CommonDeleteAdministrativeAreasLevel1Handler>(CommonDeleteAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel1Data deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data)));
            expect(await controller.main()).toBe(commonMockAdministrativeAreaLevel1Data);
        });
    });
});
