import { WhatsappCreateConversationsHandler } from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationsHandler', () =>
{
    let handler: WhatsappCreateConversationsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateConversationsHandler,
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        handler = module.get<WhatsappCreateConversationsHandler>(WhatsappCreateConversationsHandler);
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationsHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });

        test('should return an whatsappMockConversationData created', async () =>
        {
            expect(await handler.main(whatsappMockConversationData)).toBe(true);
        });
    });
});
