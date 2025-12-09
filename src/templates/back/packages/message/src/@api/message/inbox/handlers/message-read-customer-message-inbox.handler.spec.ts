/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageReadCustomerMessageInboxHandler } from './message-read-customer-message-inbox.handler';

describe('MessageReadCustomerMessageInboxHandler', () => {
    let handler: MessageReadCustomerMessageInboxHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageReadCustomerMessageInboxHandler,
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

        handler = module.get<MessageReadCustomerMessageInboxHandler>(
            MessageReadCustomerMessageInboxHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => {
        test('MessageReadCustomerMessageInboxHandler should be defined', () => {
            expect(handler).toBeDefined();
        });
    });
});
