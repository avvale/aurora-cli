/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonFindAdministrativeAreaLevel3Handler } from './common-find-administrative-area-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonFindAdministrativeAreaLevel3Handler', () =>
{
    let handler: CommonFindAdministrativeAreaLevel3Handler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel3Handler,
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

        handler    = module.get<CommonFindAdministrativeAreaLevel3Handler>(CommonFindAdministrativeAreaLevel3Handler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonFindAdministrativeAreaLevel3Handler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel3Handler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreaLevel3', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await handler.main()).toBe(administrativeAreasLevel3[0]);
        });
    });
});