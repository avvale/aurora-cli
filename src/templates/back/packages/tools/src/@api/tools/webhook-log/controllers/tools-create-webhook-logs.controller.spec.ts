import {
    ToolsCreateWebhookLogsController,
    ToolsCreateWebhookLogsHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogsController', () => {
    let controller: ToolsCreateWebhookLogsController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ToolsCreateWebhookLogsController],
            providers: [
                {
                    provide: ToolsCreateWebhookLogsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsCreateWebhookLogsController>(
            ToolsCreateWebhookLogsController,
        );
    });

    describe('main', () => {
        test('ToolsCreateWebhookLogsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockWebhookLogData created', async () => {
            expect(await controller.main(toolsMockWebhookLogData)).toBe(
                undefined,
            );
        });
    });
});
