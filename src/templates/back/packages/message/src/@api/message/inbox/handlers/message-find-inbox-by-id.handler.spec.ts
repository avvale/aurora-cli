/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxByIdHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxByIdHandler', () =>
{
    let handler: MessageFindInboxByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageFindInboxByIdHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<MessageFindInboxByIdHandler>(MessageFindInboxByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageFindInboxByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageFindInboxByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an inbox by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(
                await handler.main(
                    messageMockInboxData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockInboxData[0]);
        });
    });
});
