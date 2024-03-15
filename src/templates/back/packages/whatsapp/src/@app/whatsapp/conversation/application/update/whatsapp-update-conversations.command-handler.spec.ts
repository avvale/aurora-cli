import { whatsappMockConversationData, WhatsappUpdateConversationsCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationsCommandHandler } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversations.command-handler';
import { WhatsappUpdateConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversations.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationsCommandHandler', () =>
{
    let commandHandler: WhatsappUpdateConversationsCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpdateConversationsCommandHandler,
                {
                    provide : WhatsappUpdateConversationsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpdateConversationsCommandHandler>(WhatsappUpdateConversationsCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateConversationsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an conversations updated', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpdateConversationsCommand(
                    {
                        id: whatsappMockConversationData[0].id,
                        accounts: whatsappMockConversationData[0].accounts,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
