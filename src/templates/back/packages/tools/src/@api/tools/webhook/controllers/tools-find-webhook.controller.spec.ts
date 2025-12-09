import {
    ToolsFindWebhookController,
    ToolsFindWebhookHandler,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookController', () => {
    let controller: ToolsFindWebhookController;
    let handler: ToolsFindWebhookHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsFindWebhookController],
            providers: [
                {
                    provide: ToolsFindWebhookHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsFindWebhookController>(
            ToolsFindWebhookController,
        );
        handler = module.get<ToolsFindWebhookHandler>(ToolsFindWebhookHandler);
    });

    describe('main', () => {
        test('ToolsFindWebhookController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a webhook', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(await controller.main()).toBe(toolsMockWebhookData[0]);
        });
    });
});
