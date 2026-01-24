import {
  MessageIOutboxRepository,
  MessageMockOutboxRepository,
} from '@app/message/outbox';
import { MessageFindOutboxService } from '@app/message/outbox/application/find/message-find-outbox.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxService', () => {
  let service: MessageFindOutboxService;
  let repository: MessageIOutboxRepository;
  let mockRepository: MessageMockOutboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageFindOutboxService,
        MessageMockOutboxRepository,
        {
          provide: MessageIOutboxRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageFindOutboxService);
    repository = module.get(MessageIOutboxRepository);
    mockRepository = module.get(MessageMockOutboxRepository);
  });

  describe('main', () => {
    test('MessageFindOutboxService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find outbox', async () => {
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
