/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateAdministrativeAreasLevel2Controller } from './common-paginate-administrative-areas-level-2.controller';
import { CommonPaginateAdministrativeAreasLevel2Handler } from '../handlers/common-paginate-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonPaginateAdministrativeAreasLevel2Controller', () =>
{
    let controller: CommonPaginateAdministrativeAreasLevel2Controller;
    let handler: CommonPaginateAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAdministrativeAreasLevel2Controller,
            ],
            providers: [
                {
                    provide : CommonPaginateAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonPaginateAdministrativeAreasLevel2Controller>(CommonPaginateAdministrativeAreasLevel2Controller);
        handler = module.get<CommonPaginateAdministrativeAreasLevel2Handler>(CommonPaginateAdministrativeAreasLevel2Handler);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel2Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel2', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel2,
            })));
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel2,
            });
        });
    });
});