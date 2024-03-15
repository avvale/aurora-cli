/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappUpsertConversationService } from '@app/whatsapp/conversation/application/upsert/whatsapp-upsert-conversation.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpsertConversationService', () =>

{
    let service: WhatsappUpsertConversationService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappUpsertConversationService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        upsert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappUpsertConversationService);
    });

    describe('main', () =>
    {
        test('WhatsappUpsertConversationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should upsert a conversation and emit event', async () =>
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
