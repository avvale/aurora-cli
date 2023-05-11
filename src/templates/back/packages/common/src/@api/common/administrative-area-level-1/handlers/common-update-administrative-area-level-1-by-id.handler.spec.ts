/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from './common-update-administrative-area-level-1-by-id.handler';
import { CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonUpdateAdministrativeAreaLevel1ByIdHandler', () =>
{
    let handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel1ByIdHandler,
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

        handler     = module.get<CommonUpdateAdministrativeAreaLevel1ByIdHandler>(CommonUpdateAdministrativeAreaLevel1ByIdHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateAdministrativeAreaLevel1ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel1ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await handler.main(<CommonUpdateAdministrativeAreaLevel1ByIdInput>administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});