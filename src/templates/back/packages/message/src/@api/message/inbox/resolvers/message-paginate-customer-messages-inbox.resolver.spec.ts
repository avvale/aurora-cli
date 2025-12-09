/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessagePaginateCustomerMessagesInboxHandler } from '../handlers/message-paginate-customer-messages-inbox.handler';
import { MessagePaginateCustomerMessagesInboxResolver } from './message-paginate-customer-messages-inbox.resolver';

describe('MessagePaginateCustomerMessagesInboxResolver', () => {
    let resolver: MessagePaginateCustomerMessagesInboxResolver;
    let handler: MessagePaginateCustomerMessagesInboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessagePaginateCustomerMessagesInboxResolver,
                {
                    provide: MessagePaginateCustomerMessagesInboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessagePaginateCustomerMessagesInboxResolver>(
            MessagePaginateCustomerMessagesInboxResolver,
        );
        handler = module.get<MessagePaginateCustomerMessagesInboxHandler>(
            MessagePaginateCustomerMessagesInboxHandler,
        );
    });

    test('MessagePaginateCustomerMessagesInboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessagePaginateCustomerMessagesInboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
