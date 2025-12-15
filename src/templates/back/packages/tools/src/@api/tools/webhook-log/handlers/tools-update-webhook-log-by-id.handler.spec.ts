/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateWebhookLogByIdInput } from '@api/graphql';
import { ToolsUpdateWebhookLogByIdHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookLogByIdHandler', () => {
    let handler: ToolsUpdateWebhookLogByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateWebhookLogByIdHandler,
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

        handler = module.get<ToolsUpdateWebhookLogByIdHandler>(
            ToolsUpdateWebhookLogByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('ToolsUpdateWebhookLogByIdHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateWebhookLogByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a webhookLog updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(
                await handler.main(
                    <ToolsUpdateWebhookLogByIdInput>toolsMockWebhookLogData[0],
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(toolsMockWebhookLogData[0]);
        });
    });
});
