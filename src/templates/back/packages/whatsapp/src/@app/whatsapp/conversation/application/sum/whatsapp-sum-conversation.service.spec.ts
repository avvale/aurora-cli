import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappSumConversationService } from '@app/whatsapp/conversation/application/sum/whatsapp-sum-conversation.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappSumConversationService', () => {
  let service: WhatsappSumConversationService;
  let repository: WhatsappIConversationRepository;
  let mockRepository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappSumConversationService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
          useValue: {
            sum: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappSumConversationService);
    repository = module.get(WhatsappIConversationRepository);
    mockRepository = module.get(WhatsappMockConversationRepository);
  });

  describe('main', () => {
    test('WhatsappSumConversationService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should sum inboxes', async () => {
      jest
        .spyOn(repository, 'sum')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(mockRepository.sum(column))),
        );
      expect(await service.main('id')).toBe(mockRepository.sum('id'));
    });
  });
});
