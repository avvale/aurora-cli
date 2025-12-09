import { ToolsDeleteWebhooksCommand } from '@app/tools/webhook';
import { ToolsDeleteWebhooksCommandHandler } from '@app/tools/webhook/application/delete/tools-delete-webhooks.command-handler';
import { ToolsDeleteWebhooksService } from '@app/tools/webhook/application/delete/tools-delete-webhooks.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhooksCommandHandler', () => {
    let commandHandler: ToolsDeleteWebhooksCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteWebhooksCommandHandler,
                {
                    provide: ToolsDeleteWebhooksService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteWebhooksCommandHandler>(
            ToolsDeleteWebhooksCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteWebhooksCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should return void', async () => {
            expect(
                await commandHandler.execute(new ToolsDeleteWebhooksCommand()),
            ).toBe(undefined);
        });
    });
});
