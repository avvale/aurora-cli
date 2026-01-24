import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappFindConversationService } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationService', () => {
  let service: WhatsappFindConversationService;
  let repository: WhatsappIConversationRepository;
  let mockRepository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappFindConversationService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappFindConversationService);
    repository = module.get(WhatsappIConversationRepository);
    mockRepository = module.get(WhatsappMockConversationRepository);
  });

  describe('main', () => {
    test('WhatsappFindConversationService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find conversation', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
