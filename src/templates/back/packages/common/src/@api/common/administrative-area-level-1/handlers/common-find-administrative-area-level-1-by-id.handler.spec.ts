/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from './common-find-administrative-area-level-1-by-id.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonFindAdministrativeAreaLevel1ByIdHandler', () =>
{
    let handler: CommonFindAdministrativeAreaLevel1ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel1ByIdHandler,
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

        handler = module.get<CommonFindAdministrativeAreaLevel1ByIdHandler>(CommonFindAdministrativeAreaLevel1ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonFindAdministrativeAreaLevel1ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await handler.main(administrativeAreasLevel1[0].id)).toBe(administrativeAreasLevel1[0]);
        });
    });
});