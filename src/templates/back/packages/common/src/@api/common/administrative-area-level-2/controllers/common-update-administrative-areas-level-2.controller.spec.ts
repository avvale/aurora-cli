import { CommonUpdateAdministrativeAreasLevel2Controller, CommonUpdateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel2Controller', () =>
{
    let controller: CommonUpdateAdministrativeAreasLevel2Controller;
    let handler: CommonUpdateAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreasLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreasLevel2Controller>(CommonUpdateAdministrativeAreasLevel2Controller);
        handler = module.get<CommonUpdateAdministrativeAreasLevel2Handler>(CommonUpdateAdministrativeAreasLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel2 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel2Data[0])).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});
