/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsGetWebhookLogsHandler,
    ToolsGetWebhookLogsResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhookLogsResolver', () => {
    let resolver: ToolsGetWebhookLogsResolver;
    let handler: ToolsGetWebhookLogsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsGetWebhookLogsResolver,
                {
                    provide: ToolsGetWebhookLogsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsGetWebhookLogsResolver>(
            ToolsGetWebhookLogsResolver,
        );
        handler = module.get<ToolsGetWebhookLogsHandler>(
            ToolsGetWebhookLogsHandler,
        );
    });

    test('ToolsGetWebhookLogsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsGetWebhookLogsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a toolsMockWebhookLogData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookLogData)),
            );
            expect(await resolver.main()).toBe(toolsMockWebhookLogData);
        });
    });
});
