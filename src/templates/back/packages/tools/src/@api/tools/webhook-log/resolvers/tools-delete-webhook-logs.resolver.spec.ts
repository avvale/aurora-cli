/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteWebhookLogsHandler,
    ToolsDeleteWebhookLogsResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogsResolver', () => {
    let resolver: ToolsDeleteWebhookLogsResolver;
    let handler: ToolsDeleteWebhookLogsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteWebhookLogsResolver,
                {
                    provide: ToolsDeleteWebhookLogsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsDeleteWebhookLogsResolver>(
            ToolsDeleteWebhookLogsResolver,
        );
        handler = module.get<ToolsDeleteWebhookLogsHandler>(
            ToolsDeleteWebhookLogsHandler,
        );
    });

    test('ToolsDeleteWebhookLogsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteWebhookLogsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an toolsMockWebhookLogData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookLogData)),
            );
            expect(await resolver.main()).toBe(toolsMockWebhookLogData);
        });
    });
});
