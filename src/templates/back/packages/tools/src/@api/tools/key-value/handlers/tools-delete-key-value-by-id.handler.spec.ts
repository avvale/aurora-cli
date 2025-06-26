/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteKeyValueByIdHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteKeyValueByIdController', () =>
{
    let handler: ToolsDeleteKeyValueByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsDeleteKeyValueByIdHandler,
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

        handler = module.get<ToolsDeleteKeyValueByIdHandler>(ToolsDeleteKeyValueByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('ToolsDeleteKeyValueByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an keyValue deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(
                await handler.main(
                    toolsMockKeyValueData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockKeyValueData[0]);
        });
    });
});
