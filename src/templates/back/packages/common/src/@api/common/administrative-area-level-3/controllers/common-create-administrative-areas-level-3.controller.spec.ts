import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreasLevel3Controller } from './common-create-administrative-areas-level-3.controller';
import { CommonCreateAdministrativeAreasLevel3Handler } from '../handlers/common-create-administrative-areas-level-3.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

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