/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SupportDeleteWebhookConfigHandler } from '../handlers/support-delete-webhook-config.handler';
import { SupportDeleteWebhookConfigController } from './support-delete-webhook-config.controller';

describe('SupportDeleteWebhookConfigController', () => {
    let controller: SupportDeleteWebhookConfigController;
    let handler: SupportDeleteWebhookConfigHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [SupportDeleteWebhookConfigController],
            providers: [
                {
                    provide: SupportDeleteWebhookConfigHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<SupportDeleteWebhookConfigController>(
            SupportDeleteWebhookConfigController,
        );
        handler = module.get<SupportDeleteWebhookConfigHandler>(
            SupportDeleteWebhookConfigHandler,
        );
    });

    describe('main', () => {
        test('SupportDeleteWebhookConfigController should be defined', () => {
            expect(controller).toBeDefined();
        });
    });
});
