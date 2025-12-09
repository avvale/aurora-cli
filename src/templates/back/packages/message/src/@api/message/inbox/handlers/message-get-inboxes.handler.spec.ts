/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageGetInboxesHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxesHandler', () => {
    let handler: MessageGetInboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageGetInboxesHandler,
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

        handler = module.get<MessageGetInboxesHandler>(
            MessageGetInboxesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageGetInboxesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessageGetInboxesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a messageMockInboxData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockInboxData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                messageMockInboxData,
            );
        });
    });
});
