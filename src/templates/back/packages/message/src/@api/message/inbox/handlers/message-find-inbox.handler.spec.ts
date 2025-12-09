/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageFindInboxHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxHandler', () => {
    let handler: MessageFindInboxHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageFindInboxHandler,
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

        handler = module.get<MessageFindInboxHandler>(MessageFindInboxHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageFindInboxHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessageFindInboxHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a inbox', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockInboxData[0])),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                messageMockInboxData[0],
            );
        });
    });
});
