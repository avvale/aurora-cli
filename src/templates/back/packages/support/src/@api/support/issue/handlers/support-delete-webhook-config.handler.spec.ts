/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { SupportDeleteWebhookConfigHandler } from './support-delete-webhook-config.handler';

describe('SupportDeleteWebhookConfigHandler', () => {
    let handler: SupportDeleteWebhookConfigHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                SupportDeleteWebhookConfigHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<SupportDeleteWebhookConfigHandler>(
            SupportDeleteWebhookConfigHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => {
        test('SupportDeleteWebhookConfigHandler should be defined', () => {
            expect(handler).toBeDefined();
        });
    });
});
