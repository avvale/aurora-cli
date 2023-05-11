/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateAdministrativeAreasLevel1Handler } from './common-update-administrative-areas-level-1.handler';
import { CommonUpdateAdministrativeAreasLevel1Input } from '@api/graphql';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonUpdateAdministrativeAreasLevel1Handler', () =>
{
    let handler: CommonUpdateAdministrativeAreasLevel1Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreasLevel1Handler,
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

        handler     = module.get<CommonUpdateAdministrativeAreasLevel1Handler>(CommonUpdateAdministrativeAreasLevel1Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateAdministrativeAreasLevel1Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreasLevel1Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreasLevel1 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await handler.main(<CommonUpdateAdministrativeAreasLevel1Input>administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});