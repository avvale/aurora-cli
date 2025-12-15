import {
    ToolsPaginateWebhookLogsController,
    ToolsPaginateWebhookLogsHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhookLogsController', () => {
    let controller: ToolsPaginateWebhookLogsController;
    let handler: ToolsPaginateWebhookLogsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsPaginateWebhookLogsController],
            providers: [
                {
                    provide: ToolsPaginateWebhookLogsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsPaginateWebhookLogsController>(
            ToolsPaginateWebhookLogsController,
        );
        handler = module.get<ToolsPaginateWebhookLogsHandler>(
            ToolsPaginateWebhookLogsHandler,
        );
    });

    describe('main', () => {
        test('ToolsPaginateWebhookLogsController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockWebhookLogData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: toolsMockWebhookLogData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: toolsMockWebhookLogData,
            });
        });
    });
});
