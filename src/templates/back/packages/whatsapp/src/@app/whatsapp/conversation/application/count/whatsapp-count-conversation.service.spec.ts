import { WhatsappIConversationRepository, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappCountConversationService } from '@app/whatsapp/conversation/application/count/whatsapp-count-conversation.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCountConversationService', () =>
{
    let service: WhatsappCountConversationService;
    let repository: WhatsappIConversationRepository;
    let mockRepository: WhatsappMockConversationRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                WhatsappCountConversationService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        count: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappCountConversationService);
        repository = module.get(WhatsappIConversationRepository);
        mockRepository = module.get(WhatsappMockConversationRepository);
    });

    describe('main', () =>
    {
        test('WhatsappCountConversationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should count inboxes', async () =>
        {
            jest.spyOn(repository, 'count').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource.length)));
            expect(await service.main()).toBe(mockRepository.collectionSource.length);
        });
    });
});
