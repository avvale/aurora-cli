/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// custom items
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from './common-delete-administrative-area-level-3-by-id.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonDeleteAdministrativeAreaLevel3ByIdController', () =>
{
    let handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreaLevel3ByIdHandler,
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

        handler = module.get<CommonDeleteAdministrativeAreaLevel3ByIdHandler>(CommonDeleteAdministrativeAreaLevel3ByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreaLevel3ByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await handler.main(administrativeAreasLevel3[0].id)).toBe(administrativeAreasLevel3[0]);
        });
    });
});