/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessagePaginateOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateOutboxesHandler', () =>
{
    let handler: MessagePaginateOutboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessagePaginateOutboxesHandler,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<MessagePaginateOutboxesHandler>(MessagePaginateOutboxesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessagePaginateOutboxesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessagePaginateOutboxesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a outboxes', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve({
                total: messageMockOutboxData.length,
                count: messageMockOutboxData.length,
                rows : messageMockOutboxData,
            })));
            expect(
                await handler.main(
                    {},
                    {},
                ),
            )
                .toEqual({
                    total: messageMockOutboxData.length,
                    count: messageMockOutboxData.length,
                    rows : messageMockOutboxData,
                });
        });
    });
});
