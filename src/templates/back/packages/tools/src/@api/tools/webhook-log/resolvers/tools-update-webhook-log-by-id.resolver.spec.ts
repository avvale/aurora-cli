/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateWebhookLogByIdInput } from '@api/graphql';
import {
    ToolsUpdateWebhookLogByIdHandler,
    ToolsUpdateWebhookLogByIdResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookLogByIdResolver', () => {
    let resolver: ToolsUpdateWebhookLogByIdResolver;
    let handler: ToolsUpdateWebhookLogByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateWebhookLogByIdResolver,
                {
                    provide: ToolsUpdateWebhookLogByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsUpdateWebhookLogByIdResolver>(
            ToolsUpdateWebhookLogByIdResolver,
        );
        handler = module.get<ToolsUpdateWebhookLogByIdHandler>(
            ToolsUpdateWebhookLogByIdHandler,
        );
    });

    test('ToolsUpdateWebhookLogByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateWebhookLogByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a webhookLog by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve(toolsMockWebhookLogData[0]),
                    ),
            );
            expect(
                await resolver.main(
                    <ToolsUpdateWebhookLogByIdInput>toolsMockWebhookLogData[0],
                ),
            ).toBe(toolsMockWebhookLogData[0]);
        });
    });
});
