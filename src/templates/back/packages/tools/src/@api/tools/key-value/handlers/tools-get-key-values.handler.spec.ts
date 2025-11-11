/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsGetKeyValuesHandler } from '@api/tools/key-value';
import { toolsMockKeyValueData } from '@app/tools/key-value';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetKeyValuesHandler', () => {
    let handler: ToolsGetKeyValuesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsGetKeyValuesHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<ToolsGetKeyValuesHandler>(
            ToolsGetKeyValuesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsGetKeyValuesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsGetKeyValuesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a toolsMockKeyValueData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockKeyValueData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                toolsMockKeyValueData,
            );
        });
    });
});
