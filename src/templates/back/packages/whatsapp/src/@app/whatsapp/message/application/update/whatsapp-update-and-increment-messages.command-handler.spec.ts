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
                        wabaMessageId: whatsappMockMessageData[0].wabaMessageId,
                        timelineId: whatsappMockMessageData[0].timelineId,
                        conversationId: whatsappMockMessageData[0].conversationId,
                        statuses: whatsappMockMessageData[0].statuses,
                        direction: whatsappMockMessageData[0].direction,
                        accountId: whatsappMockMessageData[0].accountId,
                        wabaContactId: whatsappMockMessageData[0].wabaContactId,
                        contactName: whatsappMockMessageData[0].contactName,
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
