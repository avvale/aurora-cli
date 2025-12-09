import {
    ToolsPaginateWebhooksController,
    ToolsPaginateWebhooksHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhooksController', () => {
    let controller: ToolsPaginateWebhooksController;
    let handler: ToolsPaginateWebhooksHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsPaginateWebhooksController],
            providers: [
                {
                    provide: ToolsPaginateWebhooksHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsPaginateWebhooksController>(
            ToolsPaginateWebhooksController,
        );
        handler = module.get<ToolsPaginateWebhooksHandler>(
            ToolsPaginateWebhooksHandler,
        );
    });

    describe('main', () => {
        test('ToolsPaginateWebhooksController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockWebhookData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: toolsMockWebhookData,
                        }),
                    ),
            );
            expect(await controller.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: toolsMockWebhookData,
            });
        });
    });
});
