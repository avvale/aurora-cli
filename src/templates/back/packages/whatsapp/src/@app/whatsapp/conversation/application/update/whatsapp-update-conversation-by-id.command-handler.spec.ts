import { whatsappMockConversationData, WhatsappUpdateConversationByIdCommand } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationByIdCommandHandler } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversation-by-id.command-handler';
import { WhatsappUpdateConversationByIdService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversation-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationByIdCommandHandler', () =>
{
    let commandHandler: WhatsappUpdateConversationByIdCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpdateConversationByIdCommandHandler,
                {
                    provide : WhatsappUpdateConversationByIdService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpdateConversationByIdCommandHandler>(WhatsappUpdateConversationByIdCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateConversationByIdCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an conversation created', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpdateConversationByIdCommand(
                    {
                        id: whatsappMockConversationData[0].id,
                        wabaConversationId: whatsappMockConversationData[0].wabaConversationId,
                        timelineId: whatsappMockConversationData[0].timelineId,
                        wabaContactId: whatsappMockConversationData[0].wabaContactId,
                        expiration: whatsappMockConversationData[0].expiration,
                        category: whatsappMockConversationData[0].category,
                        isBillable: whatsappMockConversationData[0].isBillable,
                        pricingModel: whatsappMockConversationData[0].pricingModel,
                    },
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
