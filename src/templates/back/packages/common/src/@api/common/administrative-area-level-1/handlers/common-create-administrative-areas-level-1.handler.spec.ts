import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateAdministrativeAreasLevel1Handler } from './common-create-administrative-areas-level-1.handler';
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonCreateAdministrativeAreasLevel1Handler', () =>
{
    let handler: CommonCreateAdministrativeAreasLevel1Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateAdministrativeAreasLevel1Handler,
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

        handler     = module.get<CommonCreateAdministrativeAreasLevel1Handler>(CommonCreateAdministrativeAreasLevel1Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreasLevel1Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 created', async () =>
        {
            expect(await handler.main(administrativeAreasLevel1)).toBe(true);
        });
    });
});