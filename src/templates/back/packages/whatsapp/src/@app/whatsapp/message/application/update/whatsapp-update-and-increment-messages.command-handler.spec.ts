import { whatsappMockMessageData, WhatsappUpdateAndIncrementMessagesCommand } from '@app/whatsapp/message';
import { WhatsappUpdateAndIncrementMessagesCommandHandler } from '@app/whatsapp/message/application/update/whatsapp-update-and-increment-messages.command-handler';
import { WhatsappUpdateAndIncrementMessagesService } from '@app/whatsapp/message/application/update/whatsapp-update-and-increment-messages.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateAndIncrementMessagesCommandHandler', () =>
{
    let commandHandler: WhatsappUpdateAndIncrementMessagesCommandHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WhatsappUpdateAndIncrementMessagesCommandHandler,
                {
                    provide : WhatsappUpdateAndIncrementMessagesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<WhatsappUpdateAndIncrementMessagesCommandHandler>(WhatsappUpdateAndIncrementMessagesCommandHandler);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementMessagesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an messages updated', async () =>
        {
            /* eslint-disable key-spacing */
            expect(await commandHandler.execute(
                new WhatsappUpdateAndIncrementMessagesCommand(
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
            /* eslint-enable key-spacing */
        });
    });
});
