import { CommonDeleteAdministrativeAreasLevel2Controller, CommonDeleteAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel2Controller', () =>
{
    let controller: CommonDeleteAdministrativeAreasLevel2Controller;
    let handler: CommonDeleteAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreasLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreasLevel2Controller>(CommonDeleteAdministrativeAreasLevel2Controller);
        handler = module.get<CommonDeleteAdministrativeAreasLevel2Handler>(CommonDeleteAdministrativeAreasLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel2Data deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data)));
            expect(await controller.main()).toBe(commonMockAdministrativeAreaLevel2Data);
        });
    });
});
