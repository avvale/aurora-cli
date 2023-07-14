import { CommonCreateAdministrativeAreasLevel2Controller, CommonCreateAdministrativeAreasLevel2Handler } from '@api/common/administrative-area-level-2';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel2Controller', () =>
{
    let controller: CommonCreateAdministrativeAreasLevel2Controller;
    let handler: CommonCreateAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateAdministrativeAreasLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonCreateAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAdministrativeAreasLevel2Controller>(CommonCreateAdministrativeAreasLevel2Controller);
        handler = module.get<CommonCreateAdministrativeAreasLevel2Handler>(CommonCreateAdministrativeAreasLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel2Data created', async () =>
        {
            expect(await controller.main(commonMockAdministrativeAreaLevel2Data)).toBe(undefined);
        });
    });
});