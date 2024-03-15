/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappDeleteConversationsHandler, WhatsappDeleteConversationsResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationsResolver', () =>
{
    let resolver: WhatsappDeleteConversationsResolver;
    let handler: WhatsappDeleteConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappDeleteConversationsResolver,
                {
                    provide : WhatsappDeleteConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappDeleteConversationsResolver>(WhatsappDeleteConversationsResolver);
        handler = module.get<WhatsappDeleteConversationsHandler>(WhatsappDeleteConversationsHandler);
    });

    test('WhatsappDeleteConversationsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappDeleteConversationsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an whatsappMockConversationData deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData)));
            expect(await resolver.main()).toBe(whatsappMockConversationData);
        });
    });
});
