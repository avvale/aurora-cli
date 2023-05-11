import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateAdministrativeAreasLevel3Handler } from './common-create-administrative-areas-level-3.handler';
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonCreateAdministrativeAreasLevel3Handler', () =>
{
    let handler: CommonCreateAdministrativeAreasLevel3Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel3Handler,
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

        handler     = module.get<CommonCreateAdministrativeAreasLevel3Handler>(CommonCreateAdministrativeAreasLevel3Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 created', async () =>
        {
            expect(await handler.main(administrativeAreasLevel3)).toBe(true);
        });
    });
});