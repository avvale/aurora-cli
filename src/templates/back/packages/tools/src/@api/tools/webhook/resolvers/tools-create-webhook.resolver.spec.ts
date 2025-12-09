/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateWebhookInput } from '@api/graphql';
import {
    ToolsCreateWebhookHandler,
    ToolsCreateWebhookResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookResolver', () => {
    let resolver: ToolsCreateWebhookResolver;
    let handler: ToolsCreateWebhookHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsCreateWebhookResolver,
                {
                    provide: ToolsCreateWebhookHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsCreateWebhookResolver>(
            ToolsCreateWebhookResolver,
        );
        handler = module.get<ToolsCreateWebhookHandler>(
            ToolsCreateWebhookHandler,
        );
    });

    test('ToolsCreateWebhookResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCreateWebhookResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an webhook created', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(
                await resolver.main(
                    <ToolsCreateWebhookInput>toolsMockWebhookData[0],
                ),
            ).toBe(toolsMockWebhookData[0]);
        });
    });
});
