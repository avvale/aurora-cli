import {
    ToolsFindWebhookLogByIdController,
    ToolsFindWebhookLogByIdHandler,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogByIdController', () => {
    let controller: ToolsFindWebhookLogByIdController;
    let handler: ToolsFindWebhookLogByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsFindWebhookLogByIdController],
            providers: [
                {
                    provide: ToolsFindWebhookLogByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsFindWebhookLogByIdController>(
            ToolsFindWebhookLogByIdController,
        );
        handler = module.get<ToolsFindWebhookLogByIdHandler>(
            ToolsFindWebhookLogByIdHandler,
        );
    });

    describe('main', () => {
        test('ToolsFindWebhookLogByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return an webhookLog by id', async () => {
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
