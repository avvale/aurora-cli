/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateOutboxByIdInput } from '@api/graphql';
import { MessageUpdateOutboxByIdHandler } from '@api/message/outbox';
import { messageMockOutboxData } from '@app/message/outbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateOutboxByIdHandler', () =>
{
    let handler: MessageUpdateOutboxByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateOutboxByIdHandler,
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

        handler = module.get<MessageUpdateOutboxByIdHandler>(MessageUpdateOutboxByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageUpdateOutboxByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateOutboxByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a outbox updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockOutboxData[0])));
            expect(
                await handler.main(
                    <MessageUpdateOutboxByIdInput>messageMockOutboxData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(messageMockOutboxData[0]);
        });
    });
});
