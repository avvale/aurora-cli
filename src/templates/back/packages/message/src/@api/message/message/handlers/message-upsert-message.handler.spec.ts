/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpsertMessageHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpsertMessageHandler', () =>
{
    let handler: MessageUpsertMessageHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpsertMessageHandler,
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

        handler = module.get<MessageUpsertMessageHandler>(MessageUpsertMessageHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('MessageUpsertMessageHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an message upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(
                await handler.main(
                    messageMockMessageData[0],
                    'Europe/Madrid',
                ))
                .toBe(messageMockMessageData[0]);
        });
    });
});
