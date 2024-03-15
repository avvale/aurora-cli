import { WhatsappCreateMessageInput } from '@api/graphql';
import { WhatsappCreateMessagesHandler, WhatsappCreateMessagesResolver } from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessagesResolver', () =>
{
    let resolver: WhatsappCreateMessagesResolver;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateMessagesResolver,
                {
                    provide : WhatsappCreateMessagesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<WhatsappCreateMessagesResolver>(WhatsappCreateMessagesResolver);
    });

    test('WhatsappCreateMessagesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessagesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an messages created', async () =>
        {
            expect(await resolver.main(<WhatsappCreateMessageInput[]>whatsappMockMessageData)).toBe(undefined);
        });
    });
});
