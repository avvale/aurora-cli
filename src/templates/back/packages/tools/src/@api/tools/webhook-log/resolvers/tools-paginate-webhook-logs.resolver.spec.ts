/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsPaginateWebhookLogsHandler,
    ToolsPaginateWebhookLogsResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhookLogsResolver', () => {
    let resolver: ToolsPaginateWebhookLogsResolver;
    let handler: ToolsPaginateWebhookLogsHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsPaginateWebhookLogsResolver,
                {
                    provide: ToolsPaginateWebhookLogsHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsPaginateWebhookLogsResolver>(
            ToolsPaginateWebhookLogsResolver,
        );
        handler = module.get<ToolsPaginateWebhookLogsHandler>(
            ToolsPaginateWebhookLogsHandler,
        );
    });

    test('ToolsPaginateWebhookLogsResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsPaginateWebhookLogsResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a toolsMockWebhookLogData', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: 5,
                            count: 5,
                            rows: toolsMockWebhookLogData,
                        }),
                    ),
            );
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows: toolsMockWebhookLogData,
            });
        });
    });
});
