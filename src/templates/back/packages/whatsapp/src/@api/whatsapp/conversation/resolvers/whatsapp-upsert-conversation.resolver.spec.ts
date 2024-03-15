/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappUpsertConversationHandler, WhatsappUpsertConversationResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertConversationResolver', () =>
{
    let resolver: WhatsappUpsertConversationResolver;
    let handler: WhatsappUpsertConversationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpsertConversationResolver,
                {
                    provide : WhatsappUpsertConversationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappUpsertConversationResolver>(WhatsappUpsertConversationResolver);
        handler = module.get<WhatsappUpsertConversationHandler>(WhatsappUpsertConversationHandler);
    });

    test('WhatsappUpsertConversationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpsertConversationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an conversation upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(await resolver.main(<WhatsappUpdateConversationByIdInput>whatsappMockConversationData[0])).toBe(whatsappMockConversationData[0]);
        });
    });
});
