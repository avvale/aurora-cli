/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappGetConversationsHandler, WhatsappGetConversationsResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappGetConversationsResolver', () =>
{
    let resolver: WhatsappGetConversationsResolver;
    let handler: WhatsappGetConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappGetConversationsResolver,
                {
                    provide : WhatsappGetConversationsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappGetConversationsResolver>(WhatsappGetConversationsResolver);
        handler = module.get<WhatsappGetConversationsHandler>(WhatsappGetConversationsHandler);
    });

    test('WhatsappGetConversationsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappGetConversationsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a whatsappMockConversationData', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData)));
            expect(await resolver.main()).toBe(whatsappMockConversationData);
        });
    });
});
