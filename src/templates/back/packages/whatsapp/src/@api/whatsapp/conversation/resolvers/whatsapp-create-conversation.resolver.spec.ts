/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappCreateConversationInput } from '@api/graphql';
import { WhatsappCreateConversationHandler, WhatsappCreateConversationResolver } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationResolver', () =>
{
    let resolver: WhatsappCreateConversationResolver;
    let handler: WhatsappCreateConversationHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                WhatsappCreateConversationResolver,
                {
                    provide : WhatsappCreateConversationHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappCreateConversationResolver>(WhatsappCreateConversationResolver);
        handler = module.get<WhatsappCreateConversationHandler>(WhatsappCreateConversationHandler);
    });

    test('WhatsappCreateConversationResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an conversation created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(whatsappMockConversationData[0])));
            expect(await resolver.main(<WhatsappCreateConversationInput>whatsappMockConversationData[0])).toBe(whatsappMockConversationData[0]);
        });
    });
});
