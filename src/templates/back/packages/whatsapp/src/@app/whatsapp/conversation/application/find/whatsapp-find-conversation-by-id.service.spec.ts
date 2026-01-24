import {
  WhatsappIConversationRepository,
  whatsappMockConversationData,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappFindConversationByIdService } from '@app/whatsapp/conversation/application/find/whatsapp-find-conversation-by-id.service';
import { WhatsappConversationId } from '@app/whatsapp/conversation/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindConversationByIdService', () => {
  let service: WhatsappFindConversationByIdService;
  let repository: WhatsappIConversationRepository;
  let mockRepository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappFindConversationByIdService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappFindConversationByIdService);
    repository = module.get(WhatsappIConversationRepository);
    mockRepository = module.get(WhatsappMockConversationRepository);
  });

  describe('main', () => {
    test('FindConversationByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find conversation by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new WhatsappConversationId(whatsappMockConversationData[0].id),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
