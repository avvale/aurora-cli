/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateKeyValuesInput } from '@api/graphql';
import { ToolsUpdateKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateKeyValuesHandler', () =>
{
    let handler: ToolsUpdateKeyValuesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                ToolsUpdateKeyValuesHandler,
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

        handler = module.get<ToolsUpdateKeyValuesHandler>(ToolsUpdateKeyValuesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsUpdateKeyValuesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('ToolsUpdateKeyValuesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a keyValues updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(toolsMockKeyValueData[0])));
            expect(
                await handler.main(
                    <ToolsUpdateKeyValuesInput>toolsMockKeyValueData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(toolsMockKeyValueData[0]);
        });
    });
});
