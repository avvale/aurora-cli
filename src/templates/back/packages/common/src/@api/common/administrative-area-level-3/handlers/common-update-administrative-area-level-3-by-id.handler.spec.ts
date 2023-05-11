/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from './common-update-administrative-area-level-3-by-id.handler';
import { CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonUpdateAdministrativeAreaLevel3ByIdHandler', () =>
{
    let handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel3ByIdHandler,
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

        handler     = module.get<CommonUpdateAdministrativeAreaLevel3ByIdHandler>(CommonUpdateAdministrativeAreaLevel3ByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateAdministrativeAreaLevel3ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel3ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreaLevel3 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await handler.main(<CommonUpdateAdministrativeAreaLevel3ByIdInput>administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});