/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCheckMessagesInboxHandler } from './message-check-messages-inbox.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCheckMessagesInboxHandler', () =>
{
    let handler: MessageCheckMessagesInboxHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageCheckMessagesInboxHandler,
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

        handler     = module.get<MessageCheckMessagesInboxHandler>(MessageCheckMessagesInboxHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('MessageCheckMessagesInboxHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});