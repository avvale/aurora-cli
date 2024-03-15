import { WhatsappIConversationRepository, WhatsappMockConversationRepository } from '@app/whatsapp/conversation';
import { WhatsappMaxConversationService } from '@app/whatsapp/conversation/application/max/whatsapp-max-conversation.service';
import { CommandBus, EventBus, EventPublisher, UnhandledExceptionBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMaxConversationService', () =>
{
    let service: WhatsappMaxConversationService;
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
                WhatsappMaxConversationService,
                WhatsappMockConversationRepository,
                {
                    provide : WhatsappIConversationRepository,
                    useValue: {
                        max: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(WhatsappMaxConversationService);
        repository = module.get(WhatsappIConversationRepository);
        mockRepository = module.get(WhatsappMockConversationRepository);
    });

    describe('main', () =>
    {
        test('WhatsappMaxConversationService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should max inboxes', async () =>
        {
            jest.spyOn(repository, 'max').mockImplementation((column: string) => new Promise(resolve => resolve(mockRepository.max(column))));
            expect(await service.main('id')).toBe(mockRepository.max('id'));
        });
    });
});
