/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappIConversationRepository, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappCreateConversationsService } from '@app/whatsapp/conversation/application/create/whatsapp-create-conversations.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateConversationsService', () =>
{
    let service: WhatsappCreateConversationsService;
    let mockRepository: WhatsappMockConversationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappCreateConversationsService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappCreateConversationsService);
        mockRepository = module.get(WhatsappMockConversationRepository);
    });

    describe('main', () =>
    {
        test('CreateConversationsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create conversations and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
