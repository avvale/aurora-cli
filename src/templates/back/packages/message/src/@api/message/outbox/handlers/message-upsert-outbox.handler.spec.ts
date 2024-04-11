/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpsertOutboxHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertOutboxHandler', () =>
{
    let handler: MessageUpsertOutboxHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertOutboxHandler,
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

        handler = module.get<MessageUpsertOutboxHandler>(MessageUpsertOutboxHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('MessageUpsertOutboxHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an outbox upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(
                await handler.main(
                    messageMockOutboxData[0],
                    'Europe/Madrid',
                ))
                .toBe(messageMockOutboxData[0]);
        });
    });
});
