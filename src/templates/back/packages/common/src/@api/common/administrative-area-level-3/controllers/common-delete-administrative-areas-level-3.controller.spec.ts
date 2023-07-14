import { CommonDeleteAdministrativeAreasLevel3Controller, CommonDeleteAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonDeleteAdministrativeAreasLevel3Controller;
    let handler: CommonDeleteAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreasLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreasLevel3Controller>(CommonDeleteAdministrativeAreasLevel3Controller);
        handler = module.get<CommonDeleteAdministrativeAreasLevel3Handler>(CommonDeleteAdministrativeAreasLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel3Data deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data)));
            expect(await controller.main()).toBe(commonMockAdministrativeAreaLevel3Data);
        });
    });
});
