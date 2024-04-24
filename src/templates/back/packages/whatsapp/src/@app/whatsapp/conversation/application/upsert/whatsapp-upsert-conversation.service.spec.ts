/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappUpsertConversationService } from '@app/whatsapp/conversation/application/upsert/whatsapp-upsert-conversation.service';
import {
    WhatsappConversationCategory,
    WhatsappConversationExpiration,
    WhatsappConversationId,
    WhatsappConversationIsBillable,
    WhatsappConversationPricingModel,
    WhatsappConversationTimelineId,
    WhatsappConversationWabaContactId,
    WhatsappConversationWabaConversationId,
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
                        wabaConversationId: new WhatsappConversationWabaConversationId(whatsappMockConversationData[0].wabaConversationId),
                        timelineId: new WhatsappConversationTimelineId(whatsappMockConversationData[0].timelineId),
                        wabaContactId: new WhatsappConversationWabaContactId(whatsappMockConversationData[0].wabaContactId),
                        expiration: new WhatsappConversationExpiration(whatsappMockConversationData[0].expiration),
                        category: new WhatsappConversationCategory(whatsappMockConversationData[0].category),
                        isBillable: new WhatsappConversationIsBillable(whatsappMockConversationData[0].isBillable),
                        pricingModel: new WhatsappConversationPricingModel(whatsappMockConversationData[0].pricingModel),
                    },
                ),
            )
                .toBe(undefined);
        });
    });
});
