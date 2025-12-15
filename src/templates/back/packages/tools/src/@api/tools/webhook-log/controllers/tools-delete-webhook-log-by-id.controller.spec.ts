/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteWebhookLogByIdController,
    ToolsDeleteWebhookLogByIdHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogByIdController', () => {
    let controller: ToolsDeleteWebhookLogByIdController;
    let handler: ToolsDeleteWebhookLogByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDeleteWebhookLogByIdController],
            providers: [
                {
                    provide: ToolsDeleteWebhookLogByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDeleteWebhookLogByIdController>(
            ToolsDeleteWebhookLogByIdController,
        );
        handler = module.get<ToolsDeleteWebhookLogByIdHandler>(
            ToolsDeleteWebhookLogByIdHandler,
        );
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an webhookLog deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(await controller.main(toolsMockWebhookLogData[0].id)).toBe(
                toolsMockWebhookLogData[0],
            );
        });
    });
});
