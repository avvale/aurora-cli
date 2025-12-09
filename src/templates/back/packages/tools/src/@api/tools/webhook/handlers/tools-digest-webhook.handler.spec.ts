/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsDigestWebhookHandler } from './tools-digest-webhook.handler';

describe('ToolsDigestWebhookHandler', () => {
    let handler: ToolsDigestWebhookHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                ToolsDigestWebhookHandler,
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

        handler = module.get<ToolsDigestWebhookHandler>(
            ToolsDigestWebhookHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => {
        test('ToolsDigestWebhookHandler should be defined', () => {
            expect(handler).toBeDefined();
        });
    });
});
