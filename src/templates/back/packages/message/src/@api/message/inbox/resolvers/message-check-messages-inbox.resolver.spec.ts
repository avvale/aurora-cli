/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageCheckMessagesInboxHandler } from '../handlers/message-check-messages-inbox.handler';
import { MessageCheckMessagesInboxResolver } from './message-check-messages-inbox.resolver';

describe('MessageCheckMessagesInboxResolver', () => {
    let resolver: MessageCheckMessagesInboxResolver;
    let handler: MessageCheckMessagesInboxHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageCheckMessagesInboxResolver,
                {
                    provide: MessageCheckMessagesInboxHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageCheckMessagesInboxResolver>(
            MessageCheckMessagesInboxResolver,
        );
        handler = module.get<MessageCheckMessagesInboxHandler>(
            MessageCheckMessagesInboxHandler,
        );
    });

    test('MessageCheckMessagesInboxResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCheckMessagesInboxResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
