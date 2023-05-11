/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonDeleteAdministrativeAreasLevel1Handler } from './common-delete-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonDeleteAdministrativeAreasLevel1Handler', () =>
{
    let handler: CommonDeleteAdministrativeAreasLevel1Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreasLevel1Handler,
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

        handler    = module.get<CommonDeleteAdministrativeAreasLevel1Handler>(CommonDeleteAdministrativeAreasLevel1Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonDeleteAdministrativeAreasLevel1Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel1Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await handler.main()).toBe(administrativeAreasLevel1);
        });
    });
});