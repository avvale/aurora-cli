/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageDeleteCustomerMessageInboxHandler } from '../handlers/message-delete-customer-message-inbox.handler';
import { MessageDeleteCustomerMessageInboxResolver } from './message-delete-customer-message-inbox.resolver';

describe('MessageDeleteCustomerMessageInboxResolver', () => {
    let resolver: MessageDeleteCustomerMessageInboxResolver;
    let handler: MessageDeleteCustomerMessageInboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageDeleteCustomerMessageInboxResolver,
                {
                    provide: MessageDeleteCustomerMessageInboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageDeleteCustomerMessageInboxResolver>(
            MessageDeleteCustomerMessageInboxResolver,
        );
        handler = module.get<MessageDeleteCustomerMessageInboxHandler>(
            MessageDeleteCustomerMessageInboxHandler,
        );
    });

    test('MessageDeleteCustomerMessageInboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageDeleteCustomerMessageInboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
