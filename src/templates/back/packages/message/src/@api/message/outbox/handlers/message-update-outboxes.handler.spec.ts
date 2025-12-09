/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateOutboxesInput } from '@api/graphql';
import { MessageUpdateOutboxesHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxesHandler', () => {
    let handler: MessageUpdateOutboxesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageUpdateOutboxesHandler,
                {
                    provide: IQueryBus,
                    useValue: {
                        ask: () => {
                            /**/
                        },
                    },
                },
                {
                    provide: ICommandBus,
                    useValue: {
                        dispatch: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        handler = module.get<MessageUpdateOutboxesHandler>(
            MessageUpdateOutboxesHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageUpdateOutboxesHandler should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('main', () => {
        test('MessageUpdateOutboxesHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return a outboxes updated', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockOutboxData[0])),
            );
            expect(
                await handler.main(
                    <MessageUpdateOutboxesInput>messageMockOutboxData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(messageMockOutboxData[0]);
        });
    });
});
