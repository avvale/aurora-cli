import { whatsappMockMessageData, WhatsappUpdateMessagesCommand } from '@app/whatsapp/message';
import { WhatsappUpdateMessagesCommandHandler } from '@app/whatsapp/message/application/update/whatsapp-update-messages.command-handler';
import { WhatsappUpdateMessagesService } from '@app/whatsapp/message/application/update/whatsapp-update-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessagesCommandHandler', () =>
{
    let commandHandler: WhatsappUpdateMessagesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpdateMessagesCommandHandler,
                {
                    provide : WhatsappUpdateMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpdateMessagesCommandHandler>(WhatsappUpdateMessagesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateMessagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an messages updated', async () =>
        {
            expect(await commandHandler.execute(
                new WhatsappUpdateMessagesCommand(
                    {
                        id: whatsappMockMessageData[0].id,
                        whatsappMessageId: whatsappMockMessageData[0].whatsappMessageId,
                        conversationId: whatsappMockMessageData[0].conversationId,
                        direction: whatsappMockMessageData[0].direction,
                        accountId: whatsappMockMessageData[0].accountId,
                        displayPhoneNumber: whatsappMockMessageData[0].displayPhoneNumber,
                        phoneNumberId: whatsappMockMessageData[0].phoneNumberId,
                        type: whatsappMockMessageData[0].type,
                        payload: whatsappMockMessageData[0].payload,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
