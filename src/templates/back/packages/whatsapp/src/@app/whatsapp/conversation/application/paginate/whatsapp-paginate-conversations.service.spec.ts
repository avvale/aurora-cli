import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappPaginateConversationsService } from '@app/whatsapp/conversation/application/paginate/whatsapp-paginate-conversations.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateConversationsService', () => {
  let service: WhatsappPaginateConversationsService;
  let repository: WhatsappIConversationRepository;
  let mockRepository: WhatsappMockConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappPaginateConversationsService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappPaginateConversationsService);
    repository = module.get(WhatsappIConversationRepository);
    mockRepository = module.get(WhatsappMockConversationRepository);
  });

  describe('main', () => {
    test('WhatsappPaginateConversationsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate conversations', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
