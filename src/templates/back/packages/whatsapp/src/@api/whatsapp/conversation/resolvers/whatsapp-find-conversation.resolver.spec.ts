/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindConversationHandler, WhatsappFindConversationResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationResolver', () =>
{
    let resolver: WhatsappFindConversationResolver;
    let handler: WhatsappFindConversationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindConversationResolver,
                {
                    provide : WhatsappFindConversationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappFindConversationResolver>(WhatsappFindConversationResolver);
        handler = module.get<WhatsappFindConversationHandler>(WhatsappFindConversationHandler);
    });

    test('WhatsappFindConversationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindConversationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a conversation', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(await resolver.main()).toBe(whatsappMockConversationData[0]);
        });
    });
});
