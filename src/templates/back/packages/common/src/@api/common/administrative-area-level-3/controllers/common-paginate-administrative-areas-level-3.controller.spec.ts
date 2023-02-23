/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateAdministrativeAreasLevel3Controller } from './common-paginate-administrative-areas-level-3.controller';
import { CommonPaginateAdministrativeAreasLevel3Handler } from '../handlers/common-paginate-administrative-areas-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonPaginateAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonPaginateAdministrativeAreasLevel3Controller;
    let handler: CommonPaginateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAdministrativeAreasLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonPaginateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAdministrativeAreasLevel3Controller>(CommonPaginateAdministrativeAreasLevel3Controller);
        handler = module.get<CommonPaginateAdministrativeAreasLevel3Handler>(CommonPaginateAdministrativeAreasLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel3', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel3,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel3,
            });
        });
    });
});