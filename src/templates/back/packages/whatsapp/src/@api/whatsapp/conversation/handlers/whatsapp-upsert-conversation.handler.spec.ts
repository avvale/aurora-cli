/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpsertConversationHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertConversationHandler', () =>
{
    let handler: WhatsappUpsertConversationHandler;
    let queryBus: IQueryBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpsertConversationHandler,
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

        handler = module.get<WhatsappUpsertConversationHandler>(WhatsappUpsertConversationHandler);
        queryBus = module.get<IQueryBus>(IQueryBus);
    });

    describe('main', () =>
    {
        test('WhatsappUpsertConversationHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an conversation upserted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(
                await handler.main(
                    whatsappMockConversationData[0],
                    'Europe/Madrid',
                ))
                .toBe(whatsappMockConversationData[0]);
        });
    });
});
