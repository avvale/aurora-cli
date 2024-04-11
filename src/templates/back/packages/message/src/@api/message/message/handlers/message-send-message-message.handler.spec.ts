/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageSendMessageMessageHandler } from './message-send-message-message.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageSendMessageMessageHandler', () =>
{
    let handler: MessageSendMessageMessageHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageSendMessageMessageHandler,
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

        handler     = module.get<MessageSendMessageMessageHandler>(MessageSendMessageMessageHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('MessageSendMessageMessageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});