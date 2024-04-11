/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageRemoveAttachmentMessageHandler } from './message-remove-attachment-message.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageRemoveAttachmentMessageHandler', () =>
{
    let handler: MessageRemoveAttachmentMessageHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageRemoveAttachmentMessageHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler     = module.get<MessageRemoveAttachmentMessageHandler>(MessageRemoveAttachmentMessageHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('MessageRemoveAttachmentMessageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});