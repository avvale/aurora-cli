import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappFindMessageService } from '@app/whatsapp/message/application/find/whatsapp-find-message.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageService', () => {
  let service: WhatsappFindMessageService;
  let repository: WhatsappIMessageRepository;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappFindMessageService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappFindMessageService);
    repository = module.get(WhatsappIMessageRepository);
    mockRepository = module.get(WhatsappMockMessageRepository);
  });

  describe('main', () => {
    test('WhatsappFindMessageService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find message', async () => {
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
