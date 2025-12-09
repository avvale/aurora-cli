/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteWebhooksHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhooksHandler', () => {
    let handler: ToolsDeleteWebhooksHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteWebhooksHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<ToolsDeleteWebhooksHandler>(
            ToolsDeleteWebhooksHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsDeleteWebhooksHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteWebhooksHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an toolsMockWebhookData deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockWebhookData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                toolsMockWebhookData,
            );
        });
    });
});
