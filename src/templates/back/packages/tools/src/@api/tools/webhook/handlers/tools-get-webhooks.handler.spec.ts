/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsGetWebhooksHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhooksHandler', () => {
    let handler: ToolsGetWebhooksHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsGetWebhooksHandler,
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

        handler = module.get<ToolsGetWebhooksHandler>(ToolsGetWebhooksHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsGetWebhooksHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsGetWebhooksHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a toolsMockWebhookData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockWebhookData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                toolsMockWebhookData,
            );
        });
    });
});
