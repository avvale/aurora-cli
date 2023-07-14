import { CommonUpdateAdministrativeAreasLevel1Controller, CommonUpdateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonUpdateAdministrativeAreasLevel1Controller;
    let handler: CommonUpdateAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreasLevel1Controller>(CommonUpdateAdministrativeAreasLevel1Controller);
        handler = module.get<CommonUpdateAdministrativeAreasLevel1Handler>(CommonUpdateAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel1 updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await controller.main(commonMockAdministrativeAreaLevel1Data[0])).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});
