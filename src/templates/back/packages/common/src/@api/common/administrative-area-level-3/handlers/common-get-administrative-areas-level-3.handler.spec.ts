/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonGetAdministrativeAreasLevel3Handler } from './common-get-administrative-areas-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonGetAdministrativeAreasLevel3Handler', () =>
{
    let handler: CommonGetAdministrativeAreasLevel3Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAdministrativeAreasLevel3Handler,
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

        handler = module.get<CommonGetAdministrativeAreasLevel3Handler>(CommonGetAdministrativeAreasLevel3Handler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonGetAdministrativeAreasLevel3Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel3', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3)));
            expect(await handler.main()).toBe(administrativeAreasLevel3);
        });
    });
});