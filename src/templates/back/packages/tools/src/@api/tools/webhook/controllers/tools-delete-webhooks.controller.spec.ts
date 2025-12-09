import {
    ToolsDeleteWebhooksController,
    ToolsDeleteWebhooksHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhooksController', () => {
    let controller: ToolsDeleteWebhooksController;
    let handler: ToolsDeleteWebhooksHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDeleteWebhooksController],
            providers: [
                {
                    provide: ToolsDeleteWebhooksHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDeleteWebhooksController>(
            ToolsDeleteWebhooksController,
        );
        handler = module.get<ToolsDeleteWebhooksHandler>(
            ToolsDeleteWebhooksHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteWebhooksController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an toolsMockWebhookData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockWebhookData)),
            );
            expect(await controller.main()).toBe(toolsMockWebhookData);
        });
    });
});
