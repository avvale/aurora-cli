/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxByIdInput } from '@api/graphql';
import { MessageUpdateInboxByIdHandler } from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxByIdHandler', () =>
{
    let handler: MessageUpdateInboxByIdHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                MessageUpdateInboxByIdHandler,
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

        handler = module.get<MessageUpdateInboxByIdHandler>(MessageUpdateInboxByIdHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('MessageUpdateInboxByIdHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('MessageUpdateInboxByIdHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a inbox updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(messageMockInboxData[0])));
            expect(
                await handler.main(
                    <MessageUpdateInboxByIdInput>messageMockInboxData[0],
                    {},
                    'Europe/Madrid',
                ))
                .toBe(messageMockInboxData[0]);
        });
    });
});
