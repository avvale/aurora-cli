/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappFindConversationByIdHandler, WhatsappFindConversationByIdResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationByIdResolver', () =>
{
    let resolver: WhatsappFindConversationByIdResolver;
    let handler: WhatsappFindConversationByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappFindConversationByIdResolver,
                {
                    provide : WhatsappFindConversationByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappFindConversationByIdResolver>(WhatsappFindConversationByIdResolver);
        handler = module.get<WhatsappFindConversationByIdHandler>(WhatsappFindConversationByIdHandler);
    });

    test('WhatsappFindConversationByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappFindConversationByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an conversation by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(await resolver.main(whatsappMockConversationData[0].id)).toBe(whatsappMockConversationData[0]);
        });
    });
});
