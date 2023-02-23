/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateAdministrativeAreasLevel1Controller } from './common-paginate-administrative-areas-level-1.controller';
import { CommonPaginateAdministrativeAreasLevel1Handler } from '../handlers/common-paginate-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonPaginateAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonPaginateAdministrativeAreasLevel1Controller;
    let handler: CommonPaginateAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonPaginateAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAdministrativeAreasLevel1Controller>(CommonPaginateAdministrativeAreasLevel1Controller);
        handler = module.get<CommonPaginateAdministrativeAreasLevel1Handler>(CommonPaginateAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel1', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel1,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel1,
            });
        });
    });
});