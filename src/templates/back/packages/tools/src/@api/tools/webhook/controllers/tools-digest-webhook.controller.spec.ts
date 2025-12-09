/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsDigestWebhookHandler } from '../handlers/tools-digest-webhook.handler';
import { ToolsDigestWebhookController } from './tools-digest-webhook.controller';

describe('ToolsDigestWebhookController', () => {
    let controller: ToolsDigestWebhookController;
    let handler: ToolsDigestWebhookHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [ToolsDigestWebhookController],
            providers: [
                {
                    provide: ToolsDigestWebhookHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<ToolsDigestWebhookController>(
            ToolsDigestWebhookController,
        );
        handler = module.get<ToolsDigestWebhookHandler>(
            ToolsDigestWebhookHandler,
        );
    });

    describe('main', () => {
        test('ToolsDigestWebhookController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
