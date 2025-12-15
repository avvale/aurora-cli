import {
    ToolsDeleteWebhookLogByIdCommand,
    toolsMockWebhookLogData,
} from '@app/tools/webhook-log';
import { ToolsDeleteWebhookLogByIdCommandHandler } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-log-by-id.command-handler';
import { ToolsDeleteWebhookLogByIdService } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-log-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogByIdCommandHandler', () => {
    let commandHandler: ToolsDeleteWebhookLogByIdCommandHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsDeleteWebhookLogByIdCommandHandler,
                {
                    provide: ToolsDeleteWebhookLogByIdService,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        commandHandler = module.get<ToolsDeleteWebhookLogByIdCommandHandler>(
            ToolsDeleteWebhookLogByIdCommandHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogByIdCommandHandler should be defined', () => {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the ToolsDeleteWebhookLogByIdService', async () => {
            expect(
                await commandHandler.execute(
                    new ToolsDeleteWebhookLogByIdCommand(
                        toolsMockWebhookLogData[0].id,
                    ),
                ),
            ).toBe(undefined);
        });
    });
});
