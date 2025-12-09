/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ToolsFindWebhookHandler,
    ToolsFindWebhookResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookResolver', () => {
    let resolver: ToolsFindWebhookResolver;
    let handler: ToolsFindWebhookHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsFindWebhookResolver,
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

        resolver = module.get<ToolsFindWebhookResolver>(
            ToolsFindWebhookResolver,
        );
        handler = module.get<ToolsFindWebhookHandler>(ToolsFindWebhookHandler);
    });

    test('ToolsFindWebhookResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('ToolsFindWebhookResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });

        test('should return a webhook', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(toolsMockWebhookData[0])),
            );
            expect(await resolver.main()).toBe(toolsMockWebhookData[0]);
        });
    });
});
