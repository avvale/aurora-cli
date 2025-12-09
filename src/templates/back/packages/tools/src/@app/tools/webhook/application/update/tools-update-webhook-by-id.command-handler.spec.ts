import {
    toolsMockWebhookData,
    ToolsUpdateWebhookByIdCommand,
} from '@app/tools/webhook';
import { ToolsUpdateWebhookByIdCommandHandler } from '@app/tools/webhook/application/update/tools-update-webhook-by-id.command-handler';
import { ToolsUpdateWebhookByIdService } from '@app/tools/webhook/application/update/tools-update-webhook-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookByIdCommandHandler', () => {
    let commandHandler: ToolsUpdateWebhookByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsUpdateWebhookByIdCommandHandler,
                {
                    provide: ToolsUpdateWebhookByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsUpdateWebhookByIdCommandHandler>(
            ToolsUpdateWebhookByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('UpdateWebhookByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return an webhook created', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsUpdateWebhookByIdCommand(
                        {
                            id: toolsMockWebhookData[0].id,
                            rowId: toolsMockWebhookData[0].rowId,
                            name: toolsMockWebhookData[0].name,
                            service: toolsMockWebhookData[0].service,
                            endpoint: toolsMockWebhookData[0].endpoint,
                            externalId: toolsMockWebhookData[0].externalId,
                            events: toolsMockWebhookData[0].events,
                            secret: toolsMockWebhookData[0].secret,
                            meta: toolsMockWebhookData[0].meta,
                        },
                        {},
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
