/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessagePaginateInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessagePaginateInboxesHandler', () => {
    let handler: MessagePaginateInboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessagePaginateInboxesHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<MessagePaginateInboxesHandler>(
            MessagePaginateInboxesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessagePaginateInboxesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessagePaginateInboxesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a inboxes', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) =>
                        resolve({
                            total: messageMockInboxData.length,
                            count: messageMockInboxData.length,
                            rows: messageMockInboxData,
                        }),
                    ),
            );
            expect(await handler.main({}, {})).toEqual({
                total: messageMockInboxData.length,
                count: messageMockInboxData.length,
                rows: messageMockInboxData,
            });
        });
    });
});
