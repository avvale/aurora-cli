/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, whatsappMockConversationData, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappUpdateAndIncrementConversationsService } from '@app/whatsapp/conversation/application/update/whatsapp-update-and-increment-conversations.service';
import {
    WhatsappConversationAccounts,
    WhatsappConversationId,
} from '@app/whatsapp/conversation/domain/value-objects';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateAndIncrementConversationsService', () =>
{
    let service: WhatsappUpdateAndIncrementConversationsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappUpdateAndIncrementConversationsService,
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

        service = module.get(WhatsappUpdateAndIncrementConversationsService);
    });

    describe('main', () =>
    {
        test('UpdateAndIncrementConversationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should update a conversations and emit event', async () =>
        {
            /* eslint-disable key-spacing */
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
            /* eslint-enable key-spacing */
        });
    });
});
