/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappUpdateConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-conversations.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationsService', () =>
{
    let service: WhatsappUpdateConversationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappUpdateConversationsService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        update: () => { /**/ },
                        get   : () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappUpdateConversationsService);
    });

    describe('main', () =>
    {
        test('UpdateConversationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a conversations and emit event', async () =>
        {
            expect(
                await service.main(
                    {
                        id: new WhatsappConversationId(whatsappMockConversationData[0].id),
                        accounts: new WhatsappConversationAccounts(whatsappMockConversationData[0].accounts),
                    },
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
