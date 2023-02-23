import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreasLevel2Controller } from './common-create-administrative-areas-level-2.controller';
import { CommonCreateAdministrativeAreasLevel2Handler } from '../handlers/common-create-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

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

        test('should return an administrativeAreasLevel2 created', async () =>
        {
            expect(await controller.main(administrativeAreasLevel2)).toBe(undefined);
        });
    });
});