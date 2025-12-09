/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageUnreadCustomerMessageInboxHandler } from '../handlers/message-unread-customer-message-inbox.handler';
import { MessageUnreadCustomerMessageInboxResolver } from './message-unread-customer-message-inbox.resolver';

describe('MessageUnreadCustomerMessageInboxResolver', () => {
    let resolver: MessageUnreadCustomerMessageInboxResolver;
    let handler: MessageUnreadCustomerMessageInboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageUnreadCustomerMessageInboxResolver,
                {
                    provide: MessageUnreadCustomerMessageInboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageUnreadCustomerMessageInboxResolver>(
            MessageUnreadCustomerMessageInboxResolver,
        );
        handler = module.get<MessageUnreadCustomerMessageInboxHandler>(
            MessageUnreadCustomerMessageInboxHandler,
        );
    });

    test('MessageUnreadCustomerMessageInboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageUnreadCustomerMessageInboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
