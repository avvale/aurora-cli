/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateKeyValueHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateKeyValueHandler', () =>
{
    let handler: ToolsCreateKeyValueHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsCreateKeyValueHandler,
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

        handler = module.get<ToolsCreateKeyValueHandler>(ToolsCreateKeyValueHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('ToolsCreateKeyValueHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an keyValue created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(
                await handler.main(
                    toolsMockKeyValueData[0],
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockKeyValueData[0]);
        });
    });
});
