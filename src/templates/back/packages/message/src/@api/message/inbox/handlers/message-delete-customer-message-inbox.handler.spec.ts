/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MessageDeleteCustomerMessageInboxHandler } from './message-delete-customer-message-inbox.handler';

describe('MessageDeleteCustomerMessageInboxHandler', () => {
    let handler: MessageDeleteCustomerMessageInboxHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageDeleteCustomerMessageInboxHandler,
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

        handler = module.get<MessageDeleteCustomerMessageInboxHandler>(
            MessageDeleteCustomerMessageInboxHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
        commandBus = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () => {
        test('MessageDeleteCustomerMessageInboxHandler should be defined', () => {
            expect(handler).toBeDefined();
        });
    });
});
