/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonFindAdministrativeAreaLevel2ByIdHandler } from './common-find-administrative-area-level-2-by-id.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonFindAdministrativeAreaLevel2ByIdHandler', () =>
{
    let handler: CommonFindAdministrativeAreaLevel2ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonFindAdministrativeAreaLevel2ByIdHandler,
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

        handler = module.get<CommonFindAdministrativeAreaLevel2ByIdHandler>(CommonFindAdministrativeAreaLevel2ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonFindAdministrativeAreaLevel2ByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel2ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await handler.main(administrativeAreasLevel2[0].id)).toBe(administrativeAreasLevel2[0]);
        });
    });
});