import {
    ToolsCreateWebhookCommand,
    toolsMockWebhookData,
} from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsCreateWebhookCommandHandler } from './tools-create-webhook.command-handler';
import { ToolsCreateWebhookService } from './tools-create-webhook.service';

describe('ToolsCreateWebhookCommandHandler', () => {
    let commandHandler: ToolsCreateWebhookCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateWebhookCommandHandler,
                {
                    provide: ToolsCreateWebhookService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsCreateWebhookCommandHandler>(
            ToolsCreateWebhookCommandHandler,
        );
    });

    describe('main', () => {
        test('CreateWebhookCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the values objects and pass them as parameters to the ToolsCreateWebhookService', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsCreateWebhookCommand(
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
                        { timezone: process.env.TZ },
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
