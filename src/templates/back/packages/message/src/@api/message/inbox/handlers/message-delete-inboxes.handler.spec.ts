/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxesHandler', () =>
{
    let handler: MessageDeleteInboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteInboxesHandler,
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

        handler = module.get<MessageDeleteInboxesHandler>(MessageDeleteInboxesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageDeleteInboxesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageDeleteInboxesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockInboxData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockInboxData);
        });
    });
});
