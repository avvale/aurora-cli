/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageDeleteMessagesHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessagesHandler', () =>
{
    let handler: MessageDeleteMessagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageDeleteMessagesHandler,
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

        handler = module.get<MessageDeleteMessagesHandler>(MessageDeleteMessagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageDeleteMessagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageDeleteMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an messageMockMessageData deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData)));
            expect(
                await handler.main(
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockMessageData);
        });
    });
});
