/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateAdministrativeAreasLevel3Handler } from './common-update-administrative-areas-level-3.handler';
import { CommonUpdateAdministrativeAreasLevel3Input } from '@api/graphql';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonUpdateAdministrativeAreasLevel3Handler', () =>
{
    let handler: CommonUpdateAdministrativeAreasLevel3Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreasLevel3Handler,
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

        handler     = module.get<CommonUpdateAdministrativeAreasLevel3Handler>(CommonUpdateAdministrativeAreasLevel3Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateAdministrativeAreasLevel3Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel3 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await handler.main(<CommonUpdateAdministrativeAreasLevel3Input>administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});