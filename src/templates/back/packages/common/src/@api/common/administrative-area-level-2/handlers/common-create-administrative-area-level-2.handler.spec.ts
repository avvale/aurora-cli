/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonCreateAdministrativeAreaLevel2Handler } from './common-create-administrative-area-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonCreateAdministrativeAreaLevel2Handler', () =>
{
    let handler: CommonCreateAdministrativeAreaLevel2Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel2Handler,
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

        handler     = module.get<CommonCreateAdministrativeAreaLevel2Handler>(CommonCreateAdministrativeAreaLevel2Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel2Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await handler.main(administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});