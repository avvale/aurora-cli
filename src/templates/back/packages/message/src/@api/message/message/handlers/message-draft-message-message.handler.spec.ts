/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDraftMessageMessageHandler } from './message-draft-message-message.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDraftMessageMessageHandler', () =>
{
    let handler: MessageDraftMessageMessageHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDraftMessageMessageHandler,
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

        handler     = module.get<MessageDraftMessageMessageHandler>(MessageDraftMessageMessageHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('MessageDraftMessageMessageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});