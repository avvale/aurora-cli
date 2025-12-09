import {
    ToolsGetWebhooksController,
    ToolsGetWebhooksHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhooksController', () => {
    let controller: ToolsGetWebhooksController;
    let handler: ToolsGetWebhooksHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsGetWebhooksController],
            providers: [
                {
                    provide: ToolsGetWebhooksHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsGetWebhooksController>(
            ToolsGetWebhooksController,
        );
        handler = module.get<ToolsGetWebhooksHandler>(ToolsGetWebhooksHandler);
    });

    describe('main', () => {
        test('ToolsGetWebhooksController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a toolsMockWebhookData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockWebhookData)),
            );
            expect(await controller.main()).toBe(toolsMockWebhookData);
        });
    });
});
