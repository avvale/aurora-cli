import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappRawSQLConversationsService } from '@app/whatsapp/conversation/application/raw-sql/whatsapp-raw-sql-conversations.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappRawSQLConversationsService ', () => {
  let service: WhatsappRawSQLConversationsService;
  let repository: WhatsappIConversationRepository;
  let mockRepository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappRawSQLConversationsService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
          useValue: {
            rawSQL: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappRawSQLConversationsService);
    repository = module.get(WhatsappIConversationRepository);
    mockRepository = module.get(WhatsappMockConversationRepository);
  });

  describe('main', () => {
    test('RawSQLConversationsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get conversations', async () => {
      jest
        .spyOn(repository, 'rawSQL')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
