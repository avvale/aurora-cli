import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappCountMessageService } from '@app/whatsapp/message/application/count/whatsapp-count-message.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCountMessageService', () => {
  let service: WhatsappCountMessageService;
  let repository: WhatsappIMessageRepository;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappCountMessageService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            count: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappCountMessageService);
    repository = module.get(WhatsappIMessageRepository);
    mockRepository = module.get(WhatsappMockMessageRepository);
  });

  describe('main', () => {
    test('WhatsappCountMessageService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should count inboxes', async () => {
      jest
        .spyOn(repository, 'count')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource.length),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource.length);
    });
  });
});
