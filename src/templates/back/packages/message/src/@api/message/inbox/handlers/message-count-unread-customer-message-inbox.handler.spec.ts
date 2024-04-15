/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCountUnreadCustomerMessageInboxHandler } from './message-count-unread-customer-message-inbox.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCountUnreadCustomerMessageInboxHandler', () =>
{
    let handler: MessageCountUnreadCustomerMessageInboxHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageCountUnreadCustomerMessageInboxHandler,
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

        handler     = module.get<MessageCountUnreadCustomerMessageInboxHandler>(MessageCountUnreadCustomerMessageInboxHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('MessageCountUnreadCustomerMessageInboxHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});