import { whatsappMockConversationData, WhatsappUpsertConversationCommand } from '@app/whatsapp/conversation';
import { WhatsappUpsertConversationCommandHandler } from '@app/whatsapp/conversation/application/upsert/whatsapp-upsert-conversation.command-handler';
import { WhatsappUpsertConversationService } from '@app/whatsapp/conversation/application/upsert/whatsapp-upsert-conversation.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertConversationCommandHandler', () =>
{
    let commandHandler: WhatsappUpsertConversationCommandHandler;
    let service: WhatsappUpsertConversationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpsertConversationCommandHandler,
                {
                    provide : WhatsappUpsertConversationService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpsertConversationCommandHandler>(WhatsappUpsertConversationCommandHandler);
        service = module.get<WhatsappUpsertConversationService>(WhatsappUpsertConversationService);
    });

    describe('main', () =>
    {
        test('UpsertConversationCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should upsert the values objects and pass them as parameters to the WhatsappUpsertConversationService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpsertConversationCommand(
                    {
                        id: whatsappMockConversationData[0].id,
                        accounts: whatsappMockConversationData[0].accounts,
                    },
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
