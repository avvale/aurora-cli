import { CommonCreateAdministrativeAreasLevel3Controller, CommonCreateAdministrativeAreasLevel3Handler } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonCreateAdministrativeAreasLevel3Controller;
    let handler: CommonCreateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateAdministrativeAreasLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonCreateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAdministrativeAreasLevel3Controller>(CommonCreateAdministrativeAreasLevel3Controller);
        handler = module.get<CommonCreateAdministrativeAreasLevel3Handler>(CommonCreateAdministrativeAreasLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel3Data created', async () =>
        {
            expect(await controller.main(commonMockAdministrativeAreaLevel3Data)).toBe(undefined);
        });
    });
});