/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteResourcesHandler } from '@api/common/resource';
import { commonMockResourceData } from '@app/common/resource';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteResourcesHandler', () =>
{
    let handler: CommonDeleteResourcesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteResourcesHandler,
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

        handler = module.get<CommonDeleteResourcesHandler>(CommonDeleteResourcesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('CommonDeleteResourcesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteResourcesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an commonMockResourceData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(commonMockResourceData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(commonMockResourceData);
        });
    });
});
