/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreasLevel1Controller } from './common-update-administrative-areas-level-1.controller';
import { CommonUpdateAdministrativeAreasLevel1Handler } from '../handlers/common-update-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});