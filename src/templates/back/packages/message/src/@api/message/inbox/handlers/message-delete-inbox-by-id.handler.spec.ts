/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteInboxByIdHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxByIdController', () => {
    let handler: MessageDeleteInboxByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                MessageDeleteInboxByIdHandler,
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

        handler = module.get<MessageDeleteInboxByIdHandler>(
            MessageDeleteInboxByIdHandler,
        );
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () => {
        test('MessageDeleteInboxByIdHandler should be defined', () => {
            expect(handler).toBeDefined();
        });

        test('should return an inbox deleted', async () => {
            jest.spyOn(queryBus, 'ask').mockImplementation(
                () =>
                    new Promise((resolve) => resolve(messageMockInboxData[0])),
            );
            expect(
                await handler.main(
                    messageMockInboxData[0].id,
                    {},
                    'Europe/Madrid',
                ),
            ).toBe(messageMockInboxData[0]);
        });
    });
});
