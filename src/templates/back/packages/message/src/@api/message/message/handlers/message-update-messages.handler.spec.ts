/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateMessagesInput } from '@api/graphql';
import { MessageUpdateMessagesHandler } from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateMessagesHandler', () =>
{
    let handler: MessageUpdateMessagesHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateMessagesHandler,
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

        handler = module.get<MessageUpdateMessagesHandler>(MessageUpdateMessagesHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageUpdateMessagesHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateMessagesHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a messages updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockMessageData[0])));
            expect(
                await handler.main(
                    <MessageUpdateMessagesInput>messageMockMessageData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(messageMockMessageData[0]);
        });
    });
});
