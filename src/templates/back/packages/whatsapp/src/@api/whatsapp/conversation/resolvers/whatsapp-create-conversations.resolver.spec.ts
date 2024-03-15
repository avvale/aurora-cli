import { WhatsappCreateConversationInput } from '@api/graphql';
import { WhatsappCreateConversationsHandler, WhatsappCreateConversationsResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationsResolver', () =>
{
    let resolver: WhatsappCreateConversationsResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateConversationsResolver,
                {
                    provide : WhatsappCreateConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappCreateConversationsResolver>(WhatsappCreateConversationsResolver);
    });

    test('WhatsappCreateConversationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an conversations created', async () =>
        {
            expect(await resolver.main(<WhatsappCreateConversationInput[]>whatsappMockConversationData)).toBe(undefined);
        });
    });
});
