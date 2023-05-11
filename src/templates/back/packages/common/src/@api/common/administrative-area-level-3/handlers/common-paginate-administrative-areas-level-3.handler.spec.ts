/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateAdministrativeAreasLevel3Handler } from './common-paginate-administrative-areas-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonPaginateAdministrativeAreasLevel3Handler', () =>
{
    let handler: CommonPaginateAdministrativeAreasLevel3Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAdministrativeAreasLevel3Handler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<CommonPaginateAdministrativeAreasLevel3Handler>(CommonPaginateAdministrativeAreasLevel3Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonPaginateAdministrativeAreasLevel3Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel3', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: administrativeAreasLevel3.length,
                count: administrativeAreasLevel3.length,
                rows : administrativeAreasLevel3,
            })));
            expect(await handler.main()).toEqual({
                total: administrativeAreasLevel3.length,
                count: administrativeAreasLevel3.length,
                rows : administrativeAreasLevel3,
            });
        });
    });
});