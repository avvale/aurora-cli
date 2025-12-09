/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateWebhookByIdInput } from '@api/graphql';
import {
    ToolsUpdateWebhookByIdHandler,
    ToolsUpdateWebhookByIdResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookByIdResolver', () => {
    let resolver: ToolsUpdateWebhookByIdResolver;
    let handler: ToolsUpdateWebhookByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsUpdateWebhookByIdResolver,
                {
                    provide: ToolsUpdateWebhookByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsUpdateWebhookByIdResolver>(
            ToolsUpdateWebhookByIdResolver,
        );
        handler = module.get<ToolsUpdateWebhookByIdHandler>(
            ToolsUpdateWebhookByIdHandler,
        );
    });

    test('ToolsUpdateWebhookByIdResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsUpdateWebhookByIdResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a webhook by id updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(
                await resolver.main(
                    <ToolsUpdateWebhookByIdInput>toolsMockWebhookData[0],
                ),
            ).toBe(toolsMockWebhookData[0]);
        });
    });
});
