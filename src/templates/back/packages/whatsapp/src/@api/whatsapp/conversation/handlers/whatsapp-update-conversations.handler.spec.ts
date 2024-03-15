/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateConversationsInput } from '@api/graphql';
import { WhatsappUpdateConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationsHandler', () =>
{
    let handler: WhatsappUpdateConversationsHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateConversationsHandler,
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

        handler = module.get<WhatsappUpdateConversationsHandler>(WhatsappUpdateConversationsHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    test('WhatsappUpdateConversationsHandler should be defined', () =>
    {
        expect(handler).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateConversationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return a conversations updated', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(
                await handler.main(
                    <WhatsappUpdateConversationsInput>whatsappMockConversationData[0],
                    {},
                    {},
                    'Europe/Madrid',
                ),
            )
                .toBe(whatsappMockConversationData[0]);
        });
    });
});
