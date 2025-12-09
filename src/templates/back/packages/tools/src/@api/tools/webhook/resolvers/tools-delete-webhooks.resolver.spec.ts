/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsDeleteWebhooksHandler,
    ToolsDeleteWebhooksResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhooksResolver', () => {
    let resolver: ToolsDeleteWebhooksResolver;
    let handler: ToolsDeleteWebhooksHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDeleteWebhooksResolver,
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

        resolver = module.get<ToolsDeleteWebhooksResolver>(
            ToolsDeleteWebhooksResolver,
        );
        handler = module.get<ToolsDeleteWebhooksHandler>(
            ToolsDeleteWebhooksHandler,
        );
    });

    test('ToolsDeleteWebhooksResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsDeleteWebhooksResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an toolsMockWebhookData deleted', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(toolsMockWebhookData)),
            );
            expect(await resolver.main()).toBe(toolsMockWebhookData);
        });
    });
});
