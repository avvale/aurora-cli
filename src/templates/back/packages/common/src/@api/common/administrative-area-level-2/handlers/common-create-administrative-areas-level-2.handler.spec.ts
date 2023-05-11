import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateAdministrativeAreasLevel2Handler } from './common-create-administrative-areas-level-2.handler';
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonCreateAdministrativeAreasLevel2Handler', () =>
{
    let handler: CommonCreateAdministrativeAreasLevel2Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel2Handler,
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

        handler     = module.get<CommonCreateAdministrativeAreasLevel2Handler>(CommonCreateAdministrativeAreasLevel2Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel2Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 created', async () =>
        {
            expect(await handler.main(administrativeAreasLevel2)).toBe(true);
        });
    });
});