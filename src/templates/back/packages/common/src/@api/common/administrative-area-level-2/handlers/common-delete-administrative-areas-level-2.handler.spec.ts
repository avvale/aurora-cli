/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonDeleteAdministrativeAreasLevel2Handler } from './common-delete-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonDeleteAdministrativeAreasLevel2Handler', () =>
{
    let handler: CommonDeleteAdministrativeAreasLevel2Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreasLevel2Handler,
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

        handler    = module.get<CommonDeleteAdministrativeAreasLevel2Handler>(CommonDeleteAdministrativeAreasLevel2Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonDeleteAdministrativeAreasLevel2Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel2Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2)));
            expect(await handler.main()).toBe(administrativeAreasLevel2);
        });
    });
});