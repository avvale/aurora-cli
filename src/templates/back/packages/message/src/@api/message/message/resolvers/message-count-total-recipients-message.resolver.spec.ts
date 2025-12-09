/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageCountTotalRecipientsMessageHandler } from '../handlers/message-count-total-recipients-message.handler';
import { MessageCountTotalRecipientsMessageResolver } from './message-count-total-recipients-message.resolver';

describe('MessageCountTotalRecipientsMessageResolver', () => {
    let resolver: MessageCountTotalRecipientsMessageResolver;
    let handler: MessageCountTotalRecipientsMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageCountTotalRecipientsMessageResolver,
                {
                    provide: MessageCountTotalRecipientsMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageCountTotalRecipientsMessageResolver>(
            MessageCountTotalRecipientsMessageResolver,
        );
        handler = module.get<MessageCountTotalRecipientsMessageHandler>(
            MessageCountTotalRecipientsMessageHandler,
        );
    });

    test('MessageCountTotalRecipientsMessageResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageCountTotalRecipientsMessageResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
