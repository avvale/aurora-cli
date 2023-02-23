/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreasLevel2Controller } from './common-update-administrative-areas-level-2.controller';
import { CommonUpdateAdministrativeAreasLevel2Handler } from '../handlers/common-update-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await controller.main(administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});