/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateConversationByIdInput } from '@api/graphql';
import { WhatsappUpdateConversationByIdHandler, WhatsappUpdateConversationByIdResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationByIdResolver', () =>
{
    let resolver: WhatsappUpdateConversationByIdResolver;
    let handler: WhatsappUpdateConversationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappUpdateConversationByIdResolver,
                {
                    provide : WhatsappUpdateConversationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappUpdateConversationByIdResolver>(WhatsappUpdateConversationByIdResolver);
        handler = module.get<WhatsappUpdateConversationByIdHandler>(WhatsappUpdateConversationByIdHandler);
    });

    test('WhatsappUpdateConversationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappUpdateConversationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a conversation by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(await resolver.main(<WhatsappUpdateConversationByIdInput>whatsappMockConversationData[0])).toBe(whatsappMockConversationData[0]);
        });
    });
});
