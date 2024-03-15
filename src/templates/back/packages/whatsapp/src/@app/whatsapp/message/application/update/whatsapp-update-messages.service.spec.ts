/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIMessageRepository, whatsappMockMessageData, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappUpdateMessagesService } from '@app/whatsapp/message/application/update/whatsapp-update-messages.service';
import {
    WhatsappMessageAccountId,
    WhatsappMessageConversationId,
    WhatsappMessageDirection,
    WhatsappMessageDisplayPhoneNumber,
    WhatsappMessageId,
    WhatsappMessagePayload,
    WhatsappMessagePhoneNumberId,
    WhatsappMessageType,
    WhatsappMessageWhatsappMessageId,
} from '@app/whatsapp/message/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessagesService', () =>
{
    let service: WhatsappUpdateMessagesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappUpdateMessagesService,
                WhatsappMockMessageRepository,
                {
                    provide : WhatsappIMessageRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappUpdateMessagesService);
    });

    describe('main', () =>
    {
        test('UpdateMessagesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a messages and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new WhatsappMessageId(whatsappMockMessageData[0].id),
                        whatsappMessageId: new WhatsappMessageWhatsappMessageId(whatsappMockMessageData[0].whatsappMessageId),
                        conversationId: new WhatsappMessageConversationId(whatsappMockMessageData[0].conversationId),
                        direction: new WhatsappMessageDirection(whatsappMockMessageData[0].direction),
                        accountId: new WhatsappMessageAccountId(whatsappMockMessageData[0].accountId),
                        displayPhoneNumber: new WhatsappMessageDisplayPhoneNumber(whatsappMockMessageData[0].displayPhoneNumber),
                        phoneNumberId: new WhatsappMessagePhoneNumberId(whatsappMockMessageData[0].phoneNumberId),
                        type: new WhatsappMessageType(whatsappMockMessageData[0].type),
                        payload: new WhatsappMessagePayload(whatsappMockMessageData[0].payload),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
