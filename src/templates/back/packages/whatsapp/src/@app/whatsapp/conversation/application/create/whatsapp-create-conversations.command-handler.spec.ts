import { WhatsappCreateConversationsCommand, whatsappMockConversationData } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationsCommandHandler } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversations.command-handler';
import { WhatsappCreateConversationsService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('whatsappCreateConversationsCommandHandler', () =>
{
    let commandHandler: WhatsappCreateConversationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappCreateConversationsCommandHandler,
                {
                    provide : WhatsappCreateConversationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappCreateConversationsCommandHandler>(WhatsappCreateConversationsCommandHandler);
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return WhatsappMockConversationData created', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappCreateConversationsCommand(
                    whatsappMockConversationData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
