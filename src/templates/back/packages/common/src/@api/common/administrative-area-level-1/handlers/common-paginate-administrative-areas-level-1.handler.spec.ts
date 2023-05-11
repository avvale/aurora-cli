/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonPaginateAdministrativeAreasLevel1Handler } from './common-paginate-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonPaginateAdministrativeAreasLevel1Handler', () =>
{
    let handler: CommonPaginateAdministrativeAreasLevel1Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAdministrativeAreasLevel1Handler,
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

        handler = module.get<CommonPaginateAdministrativeAreasLevel1Handler>(CommonPaginateAdministrativeAreasLevel1Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonPaginateAdministrativeAreasLevel1Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel1Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel1', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: administrativeAreasLevel1.length,
                count: administrativeAreasLevel1.length,
                rows : administrativeAreasLevel1,
            })));
            expect(await handler.main()).toEqual({
                total: administrativeAreasLevel1.length,
                count: administrativeAreasLevel1.length,
                rows : administrativeAreasLevel1,
            });
        });
    });
});