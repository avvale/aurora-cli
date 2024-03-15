import { WhatsappDeleteConversationByIdCommand, whatsappMockConversationData } from '@app/whatsapp/conversation';
import { WhatsappDeleteConversationByIdCommandHandler } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversation-by-id.command-handler';
import { WhatsappDeleteConversationByIdService } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversation-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationByIdCommandHandler', () =>
{
    let commandHandler: WhatsappDeleteConversationByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappDeleteConversationByIdCommandHandler,
                {
                    provide : WhatsappDeleteConversationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappDeleteConversationByIdCommandHandler>(WhatsappDeleteConversationByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('WhatsappDeleteConversationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should create the value object id and pass them as parameters to the WhatsappDeleteConversationByIdService', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappDeleteConversationByIdCommand(
                    whatsappMockConversationData[0].id,
                ),
            )).toBe(undefined);
        });
    });
});
