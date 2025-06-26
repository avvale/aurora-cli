/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValuesHandler', () =>
{
    let handler: ToolsDeleteKeyValuesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDeleteKeyValuesHandler,
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

        handler = module.get<ToolsDeleteKeyValuesHandler>(ToolsDeleteKeyValuesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsDeleteKeyValuesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsDeleteKeyValuesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an toolsMockKeyValueData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockKeyValueData);
        });
    });
});
