/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteWebhookLogByIdHandler,
    ToolsDeleteWebhookLogByIdResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogByIdResolver', () => {
    let resolver: ToolsDeleteWebhookLogByIdResolver;
    let handler: ToolsDeleteWebhookLogByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteWebhookLogByIdResolver,
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

        resolver = module.get<ToolsDeleteWebhookLogByIdResolver>(
            ToolsDeleteWebhookLogByIdResolver,
        );
        handler = module.get<ToolsDeleteWebhookLogByIdHandler>(
            ToolsDeleteWebhookLogByIdHandler,
        );
    });

    test('ToolsDeleteWebhookLogByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an webhookLog deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(await resolver.main(toolsMockWebhookLogData[0].id)).toBe(
                toolsMockWebhookLogData[0],
            );
        });
    });
});
