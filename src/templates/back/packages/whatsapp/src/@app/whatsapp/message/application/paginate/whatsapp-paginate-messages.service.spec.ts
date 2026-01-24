import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappPaginateMessagesService } from '@app/whatsapp/message/application/paginate/whatsapp-paginate-messages.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappPaginateMessagesService', () => {
  let service: WhatsappPaginateMessagesService;
  let repository: WhatsappIMessageRepository;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappPaginateMessagesService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappPaginateMessagesService);
    repository = module.get(WhatsappIMessageRepository);
    mockRepository = module.get(WhatsappMockMessageRepository);
  });

  describe('main', () => {
    test('WhatsappPaginateMessagesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate messages', async () => {
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
