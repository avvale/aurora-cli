/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindWebhookLogHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogHandler', () => {
    let handler: ToolsFindWebhookLogHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindWebhookLogHandler,
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

        handler = module.get<ToolsFindWebhookLogHandler>(
            ToolsFindWebhookLogHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsFindWebhookLogHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindWebhookLogHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a webhookLog', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                toolsMockWebhookLogData[0],
            );
        });
    });
});
