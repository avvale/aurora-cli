import {
    ToolsCreateWebhooksCommand,
    toolsMockWebhookData,
} from '@app/tools/webhook';
import { ToolsCreateWebhooksCommandHandler } from '@app/tools/webhook/application/create/tools-create-webhooks.command-handler';
import { ToolsCreateWebhooksService } from '@app/tools/webhook/application/create/tools-create-webhooks.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('toolsCreateWebhooksCommandHandler', () => {
    let commandHandler: ToolsCreateWebhooksCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateWebhooksCommandHandler,
                {
                    provide: ToolsCreateWebhooksService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsCreateWebhooksCommandHandler>(
            ToolsCreateWebhooksCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsCreateWebhooksCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return ToolsMockWebhookData created', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsCreateWebhooksCommand(toolsMockWebhookData, {
                        timezone: process.env.TZ,
                    }),
                ),
            ).toBe(undefined);
        });
    });
});
