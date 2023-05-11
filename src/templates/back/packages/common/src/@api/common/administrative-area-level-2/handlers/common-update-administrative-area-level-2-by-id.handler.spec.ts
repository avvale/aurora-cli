/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from './common-update-administrative-area-level-2-by-id.handler';
import { CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonUpdateAdministrativeAreaLevel2ByIdHandler', () =>
{
    let handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel2ByIdHandler,
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

        handler     = module.get<CommonUpdateAdministrativeAreaLevel2ByIdHandler>(CommonUpdateAdministrativeAreaLevel2ByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateAdministrativeAreaLevel2ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel2ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreaLevel2 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await handler.main(<CommonUpdateAdministrativeAreaLevel2ByIdInput>administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});