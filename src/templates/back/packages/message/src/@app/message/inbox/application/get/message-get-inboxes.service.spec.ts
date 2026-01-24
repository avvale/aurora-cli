import {
  MessageIInboxRepository,
  MessageMockInboxRepository,
} from '@app/message/inbox';
import { MessageGetInboxesService } from '@app/message/inbox/application/get/message-get-inboxes.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxesService', () => {
  let service: MessageGetInboxesService;
  let repository: MessageIInboxRepository;
  let mockRepository: MessageMockInboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageGetInboxesService,
        MessageMockInboxRepository,
        {
          provide: MessageIInboxRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageGetInboxesService);
    repository = module.get(MessageIInboxRepository);
    mockRepository = module.get(MessageMockInboxRepository);
  });

  describe('main', () => {
    test('GetInboxesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get inboxes', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
