/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAdministrativeAreasLevel1Controller } from './common-get-administrative-areas-level-1.controller';
import { CommonGetAdministrativeAreasLevel1Handler } from '../handlers/common-get-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonGetAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonGetAdministrativeAreasLevel1Controller;
    let handler: CommonGetAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonGetAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonGetAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonGetAdministrativeAreasLevel1Controller>(CommonGetAdministrativeAreasLevel1Controller);
        handler = module.get<CommonGetAdministrativeAreasLevel1Handler>(CommonGetAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel1', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await controller.main()).toBe(administrativeAreasLevel1);
        });
    });
});