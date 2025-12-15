import { ToolsDeleteWebhookLogsCommand } from '@app/tools/webhook-log';
import { ToolsDeleteWebhookLogsCommandHandler } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-logs.command-handler';
import { ToolsDeleteWebhookLogsService } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-logs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogsCommandHandler', () => {
    let commandHandler: ToolsDeleteWebhookLogsCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteWebhookLogsCommandHandler,
                {
                    provide: ToolsDeleteWebhookLogsService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteWebhookLogsCommandHandler>(
            ToolsDeleteWebhookLogsCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogsCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsDeleteWebhookLogsCommand(),
                ),
            ).toBe(undefined);
        });
    });
});
