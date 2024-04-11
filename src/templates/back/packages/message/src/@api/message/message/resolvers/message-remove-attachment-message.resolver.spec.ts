/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageRemoveAttachmentMessageHandler } from '../handlers/message-remove-attachment-message.handler';
import { MessageRemoveAttachmentMessageResolver } from './message-remove-attachment-message.resolver';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageRemoveAttachmentMessageResolver', () =>
{
    let resolver: MessageRemoveAttachmentMessageResolver;
    let handler: MessageRemoveAttachmentMessageHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageRemoveAttachmentMessageResolver,
                {
                    provide : MessageRemoveAttachmentMessageHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<MessageRemoveAttachmentMessageResolver>(MessageRemoveAttachmentMessageResolver);
        handler = module.get<MessageRemoveAttachmentMessageHandler>(MessageRemoveAttachmentMessageHandler);
    });

    test('MessageRemoveAttachmentMessageResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageRemoveAttachmentMessageResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });
    });
});