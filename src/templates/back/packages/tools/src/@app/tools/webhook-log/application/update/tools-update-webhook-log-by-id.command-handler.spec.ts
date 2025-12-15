import {
    toolsMockWebhookLogData,
    ToolsUpdateWebhookLogByIdCommand,
} from '@app/tools/webhook-log';
import { ToolsUpdateWebhookLogByIdCommandHandler } from '@app/tools/webhook-log/application/update/tools-update-webhook-log-by-id.command-handler';
import { ToolsUpdateWebhookLogByIdService } from '@app/tools/webhook-log/application/update/tools-update-webhook-log-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookLogByIdCommandHandler', () => {
    let commandHandler: ToolsUpdateWebhookLogByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateWebhookLogByIdCommandHandler,
                {
                    provide: ToolsUpdateWebhookLogByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsUpdateWebhookLogByIdCommandHandler>(
            ToolsUpdateWebhookLogByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateWebhookLogByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an webhookLog created', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsUpdateWebhookLogByIdCommand(
                        {
                            id: toolsMockWebhookLogData[0].id,
                            rowId: toolsMockWebhookLogData[0].rowId,
                            url: toolsMockWebhookLogData[0].url,
                            headerRequest:
                                toolsMockWebhookLogData[0].headerRequest,
                            bodyRequest: toolsMockWebhookLogData[0].bodyRequest,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
