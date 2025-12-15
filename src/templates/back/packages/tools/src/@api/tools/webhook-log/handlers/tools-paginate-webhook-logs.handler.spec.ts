/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsPaginateWebhookLogsHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhookLogsHandler', () => {
    let handler: ToolsPaginateWebhookLogsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsPaginateWebhookLogsHandler,
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

        handler = module.get<ToolsPaginateWebhookLogsHandler>(
            ToolsPaginateWebhookLogsHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsPaginateWebhookLogsHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsPaginateWebhookLogsHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a webhookLogs', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: toolsMockWebhookLogData.length,
                            count: toolsMockWebhookLogData.length,
                            rows: toolsMockWebhookLogData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: toolsMockWebhookLogData.length,
                count: toolsMockWebhookLogData.length,
                rows: toolsMockWebhookLogData,
            });
        });
    });
});
