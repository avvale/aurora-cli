/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversation.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationService', () =>

{
    let service: WhatsappCreateConversationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappCreateConversationService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        create: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappCreateConversationService);
    });

    describe('main', () =>
    {
        test('WhatsappCreateConversationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create a conversation and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new WhatsappConversationId(whatsappMockConversationData[0].id),
                        accounts: new WhatsappConversationAccounts(whatsappMockConversationData[0].accounts),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
