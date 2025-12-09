import { ToolsCreateWebhookInput } from '@api/graphql';
import {
    ToolsCreateWebhooksHandler,
    ToolsCreateWebhooksResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhooksResolver', () => {
    let resolver: ToolsCreateWebhooksResolver;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ToolsCreateWebhooksResolver,
                {
                    provide: ToolsCreateWebhooksHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<ToolsCreateWebhooksResolver>(
            ToolsCreateWebhooksResolver,
        );
    });

    test('ToolsCreateWebhooksResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsCreateWebhooksResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return an webhooks created', async () => {
            expect(
                await resolver.main(
                    <ToolsCreateWebhookInput[]>toolsMockWebhookData,
                ),
            ).toBe(undefined);
        });
    });
});
