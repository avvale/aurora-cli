import {
    ToolsCreateWebhookLogController,
    ToolsCreateWebhookLogHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogController', () => {
    let controller: ToolsCreateWebhookLogController;
    let handler: ToolsCreateWebhookLogHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsCreateWebhookLogController],
            providers: [
                {
                    provide: ToolsCreateWebhookLogHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsCreateWebhookLogController>(
            ToolsCreateWebhookLogController,
        );
        handler = module.get<ToolsCreateWebhookLogHandler>(
            ToolsCreateWebhookLogHandler,
        );
    });

    describe('main', () => {
        test('ToolsCreateWebhookLogController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an webhookLog created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(await controller.main(toolsMockWebhookLogData[0])).toBe(
                toolsMockWebhookLogData[0],
            );
        });
    });
});
