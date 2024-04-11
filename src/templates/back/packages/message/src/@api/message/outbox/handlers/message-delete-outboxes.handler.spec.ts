/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteOutboxesHandler', () =>
{
    let handler: MessageDeleteOutboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteOutboxesHandler,
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

        handler = module.get<MessageDeleteOutboxesHandler>(MessageDeleteOutboxesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageDeleteOutboxesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageDeleteOutboxesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockOutboxData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockOutboxData);
        });
    });
});
