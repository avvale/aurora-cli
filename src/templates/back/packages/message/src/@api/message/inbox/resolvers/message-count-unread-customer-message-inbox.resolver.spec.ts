/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageCountUnreadCustomerMessageInboxHandler } from '../handlers/message-count-unread-customer-message-inbox.handler';
import { MessageCountUnreadCustomerMessageInboxResolver } from './message-count-unread-customer-message-inbox.resolver';

describe('MessageCountUnreadCustomerMessageInboxResolver', () => {
    let resolver: MessageCountUnreadCustomerMessageInboxResolver;
    let handler: MessageCountUnreadCustomerMessageInboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageCountUnreadCustomerMessageInboxResolver,
                {
                    provide: MessageCountUnreadCustomerMessageInboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageCountUnreadCustomerMessageInboxResolver>(
            MessageCountUnreadCustomerMessageInboxResolver,
        );
        handler = module.get<MessageCountUnreadCustomerMessageInboxHandler>(
            MessageCountUnreadCustomerMessageInboxHandler,
        );
    });

    test('MessageCountUnreadCustomerMessageInboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCountUnreadCustomerMessageInboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
