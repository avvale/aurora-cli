import { CommonCreateAdministrativeAreasLevel1Controller, CommonCreateAdministrativeAreasLevel1Handler } from '@api/common/administrative-area-level-1';
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonCreateAdministrativeAreasLevel1Controller;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonCreateAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAdministrativeAreasLevel1Controller>(CommonCreateAdministrativeAreasLevel1Controller);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel1Data created', async () =>
        {
            expect(
                await controller.main(
                    commonMockAdministrativeAreaLevel1Data,
                ),
            )
                .toBe(undefined);
        });
    });
});
