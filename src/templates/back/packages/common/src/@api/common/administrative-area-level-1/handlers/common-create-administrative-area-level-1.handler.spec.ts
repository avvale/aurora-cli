/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateAdministrativeAreaLevel1Handler } from './common-create-administrative-area-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonCreateAdministrativeAreaLevel1Handler', () =>
{
    let handler: CommonCreateAdministrativeAreaLevel1Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel1Handler,
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

        handler     = module.get<CommonCreateAdministrativeAreaLevel1Handler>(CommonCreateAdministrativeAreaLevel1Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel1Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await handler.main(administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});