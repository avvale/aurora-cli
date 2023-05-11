/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonDeleteAdministrativeAreaLevel2ByIdHandler } from './common-delete-administrative-area-level-2-by-id.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonDeleteAdministrativeAreaLevel2ByIdController', () =>
{
    let handler: CommonDeleteAdministrativeAreaLevel2ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreaLevel2ByIdHandler,
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

        handler = module.get<CommonDeleteAdministrativeAreaLevel2ByIdHandler>(CommonDeleteAdministrativeAreaLevel2ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel2ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await handler.main(administrativeAreasLevel2[0].id)).toBe(administrativeAreasLevel2[0]);
        });
    });
});