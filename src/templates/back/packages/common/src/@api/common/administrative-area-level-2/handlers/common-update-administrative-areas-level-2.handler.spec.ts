/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateAdministrativeAreasLevel2Handler } from './common-update-administrative-areas-level-2.handler';
import { CommonUpdateAdministrativeAreasLevel2Input } from '@api/graphql';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonUpdateAdministrativeAreasLevel2Handler', () =>
{
    let handler: CommonUpdateAdministrativeAreasLevel2Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreasLevel2Handler,
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

        handler     = module.get<CommonUpdateAdministrativeAreasLevel2Handler>(CommonUpdateAdministrativeAreasLevel2Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateAdministrativeAreasLevel2Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel2Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel2 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await handler.main(<CommonUpdateAdministrativeAreasLevel2Input>administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});