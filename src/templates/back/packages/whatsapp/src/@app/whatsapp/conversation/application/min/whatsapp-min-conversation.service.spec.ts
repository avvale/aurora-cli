import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappMinConversationService } from '@app/whatsapp/conversation/application/min/whatsapp-min-conversation.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMinConversationService', () => {
  let service: WhatsappMinConversationService;
  let repository: WhatsappIConversationRepository;
  let mockRepository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappMinConversationService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
          useValue: {
            min: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappMinConversationService);
    repository = module.get(WhatsappIConversationRepository);
    mockRepository = module.get(WhatsappMockConversationRepository);
  });

  describe('main', () => {
    test('WhatsappMinConversationService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should min inboxes', async () => {
      jest
        .spyOn(repository, 'min')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(mockRepository.min(column))),
        );
      expect(await service.main('id')).toBe(mockRepository.min('id'));
    });
  });
});
