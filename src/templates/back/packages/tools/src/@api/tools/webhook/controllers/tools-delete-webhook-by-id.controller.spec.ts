/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteWebhookByIdController,
    ToolsDeleteWebhookByIdHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookByIdController', () => {
    let controller: ToolsDeleteWebhookByIdController;
    let handler: ToolsDeleteWebhookByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDeleteWebhookByIdController],
            providers: [
                {
                    provide: ToolsDeleteWebhookByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDeleteWebhookByIdController>(
            ToolsDeleteWebhookByIdController,
        );
        handler = module.get<ToolsDeleteWebhookByIdHandler>(
            ToolsDeleteWebhookByIdHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteWebhookByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an webhook deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(await controller.main(toolsMockWebhookData[0].id)).toBe(
                toolsMockWebhookData[0],
            );
        });
    });
});
