/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageGetOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetOutboxesHandler', () => {
    let handler: MessageGetOutboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageGetOutboxesHandler,
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

        handler = module.get<MessageGetOutboxesHandler>(
            MessageGetOutboxesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageGetOutboxesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessageGetOutboxesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a messageMockOutboxData', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () => new Promise((resolve) => resolve(messageMockOutboxData)),
            );
            expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
                messageMockOutboxData,
            );
        });
    });
});
