/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpsertInboxHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertInboxHandler', () =>
{
    let handler: MessageUpsertInboxHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertInboxHandler,
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

        handler = module.get<MessageUpsertInboxHandler>(MessageUpsertInboxHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('MessageUpsertInboxHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an inbox upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(
                await handler.main(
                    messageMockInboxData[0],
                    'Europe/Madrid',
                ))
                .toBe(messageMockInboxData[0]);
        });
    });
});
