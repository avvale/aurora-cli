/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationByIdService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversation-by-id.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationByIdService', () =>
{
    let service: WhatsappUpdateConversationByIdService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappUpdateConversationByIdService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        updateById: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappUpdateConversationByIdService);
    });

    describe('main', () =>
    {
        test('WhatsappUpdateConversationByIdService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a conversation and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new WhatsappConversationId(whatsappMockConversationData[0].id),
                        accounts: new WhatsappConversationAccounts(whatsappMockConversationData[0].accounts),
                    },
                    {},
                ),
            ).toBe(undefined);
        });
    });
});
