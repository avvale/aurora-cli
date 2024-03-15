/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIMessageRepository, whatsappMockMessageData, WhatsappMockMessageRepository } from '@app/whatsapp/message';
import { WhatsappCreateMessageService } from '@app/whatsapp/message/application/create/whatsapp-create-message.service';
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

describe('WhatsappCreateMessageService', () =>

{
    let service: WhatsappCreateMessageService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappCreateMessageService,
                WhatsappMockMessageRepository,
                {
                    provide : WhatsappIMessageRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappCreateMessageService);
    });

    describe('main', () =>
    {
        test('WhatsappCreateMessageService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a message and emit event', async () =>
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
                ),
            )
                .toBe(undefined);
        });
    });
});
