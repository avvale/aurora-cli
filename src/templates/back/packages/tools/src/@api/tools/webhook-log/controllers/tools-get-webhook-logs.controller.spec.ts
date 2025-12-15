import {
    ToolsGetWebhookLogsController,
    ToolsGetWebhookLogsHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhookLogsController', () => {
    let controller: ToolsGetWebhookLogsController;
    let handler: ToolsGetWebhookLogsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsGetWebhookLogsController],
            providers: [
                {
                    provide: ToolsGetWebhookLogsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsGetWebhookLogsController>(
            ToolsGetWebhookLogsController,
        );
        handler = module.get<ToolsGetWebhookLogsHandler>(
            ToolsGetWebhookLogsHandler,
        );
    });

    describe('main', () => {
        test('ToolsGetWebhookLogsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockWebhookLogData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookLogData)),
            );
            expect(await controller.main()).toBe(toolsMockWebhookLogData);
        });
    });
});
