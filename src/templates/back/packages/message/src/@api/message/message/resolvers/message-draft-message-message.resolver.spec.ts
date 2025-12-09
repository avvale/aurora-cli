/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { MessageDraftMessageMessageHandler } from '../handlers/message-draft-message-message.handler';
import { MessageDraftMessageMessageResolver } from './message-draft-message-message.resolver';

describe('MessageDraftMessageMessageResolver', () => {
    let resolver: MessageDraftMessageMessageResolver;
    let handler: MessageDraftMessageMessageHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageDraftMessageMessageResolver,
                {
                    provide: MessageDraftMessageMessageHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageDraftMessageMessageResolver>(
            MessageDraftMessageMessageResolver,
        );
        handler = module.get<MessageDraftMessageMessageHandler>(
            MessageDraftMessageMessageHandler,
        );
    });

    test('MessageDraftMessageMessageResolver should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('main', () => {
        test('MessageDraftMessageMessageResolver should be defined', () => {
            expect(resolver).toBeDefined();
        });
    });
});
