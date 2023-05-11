/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateAdministrativeAreasLevel2Handler } from './common-paginate-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonPaginateAdministrativeAreasLevel2Handler', () =>
{
    let handler: CommonPaginateAdministrativeAreasLevel2Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAdministrativeAreasLevel2Handler,
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

        handler = module.get<CommonPaginateAdministrativeAreasLevel2Handler>(CommonPaginateAdministrativeAreasLevel2Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonPaginateAdministrativeAreasLevel2Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel2Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel2', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: administrativeAreasLevel2.length,
                count: administrativeAreasLevel2.length,
                rows : administrativeAreasLevel2,
            })));
            expect(await handler.main()).toEqual({
                total: administrativeAreasLevel2.length,
                count: administrativeAreasLevel2.length,
                rows : administrativeAreasLevel2,
            });
        });
    });
});