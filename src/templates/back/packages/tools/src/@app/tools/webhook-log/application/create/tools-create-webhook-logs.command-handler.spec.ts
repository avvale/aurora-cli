import {
    ToolsCreateWebhookLogsCommand,
    toolsMockWebhookLogData,
} from '@app/tools/webhook-log';
import { ToolsCreateWebhookLogsCommandHandler } from '@app/tools/webhook-log/application/create/tools-create-webhook-logs.command-handler';
import { ToolsCreateWebhookLogsService } from '@app/tools/webhook-log/application/create/tools-create-webhook-logs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('toolsCreateWebhookLogsCommandHandler', () => {
    let commandHandler: ToolsCreateWebhookLogsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateWebhookLogsCommandHandler,
                {
                    provide: ToolsCreateWebhookLogsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsCreateWebhookLogsCommandHandler>(
            ToolsCreateWebhookLogsCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsCreateWebhookLogsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return ToolsMockWebhookLogData created', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsCreateWebhookLogsCommand(toolsMockWebhookLogData, {
                        timezone: process.env.TZ,
                    }),
                ),
            ).toBe(undefined);
        });
    });
});
