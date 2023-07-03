import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreasLevel1Controller } from './common-create-administrative-areas-level-1.controller';
import { CommonCreateAdministrativeAreasLevel1Handler } from '../handlers/common-create-administrative-areas-level-1.handler';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonCreateAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonCreateAdministrativeAreasLevel1Controller;
    let handler: CommonCreateAdministrativeAreasLevel1Handler;

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
        handler = module.get<CommonCreateAdministrativeAreasLevel1Handler>(CommonCreateAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an commonMockAdministrativeAreaLevel1Data created', async () =>
        {
            expect(await controller.main(commonMockAdministrativeAreaLevel1Data)).toBe(undefined);
        });
    });
});