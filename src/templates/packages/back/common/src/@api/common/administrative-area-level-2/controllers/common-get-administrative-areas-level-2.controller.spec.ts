/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAdministrativeAreasLevel2Controller } from './common-get-administrative-areas-level-2.controller';
import { CommonGetAdministrativeAreasLevel2Handler } from '../handlers/common-get-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonGetAdministrativeAreasLevel2Controller', () =>
{
    let controller: CommonGetAdministrativeAreasLevel2Controller;
    let handler: CommonGetAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetAdministrativeAreasLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonGetAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetAdministrativeAreasLevel2Controller>(CommonGetAdministrativeAreasLevel2Controller);
        handler = module.get<CommonGetAdministrativeAreasLevel2Handler>(CommonGetAdministrativeAreasLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel2', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2)));
            expect(await controller.main()).toBe(administrativeAreasLevel2);
        });
    });
});