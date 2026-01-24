import {
  MessageIOutboxRepository,
  MessageMockOutboxRepository,
} from '@app/message/outbox';
import { MessageGetOutboxesService } from '@app/message/outbox/application/get/message-get-outboxes.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetOutboxesService', () => {
  let service: MessageGetOutboxesService;
  let repository: MessageIOutboxRepository;
  let mockRepository: MessageMockOutboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageGetOutboxesService,
        MessageMockOutboxRepository,
        {
          provide: MessageIOutboxRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageGetOutboxesService);
    repository = module.get(MessageIOutboxRepository);
    mockRepository = module.get(MessageMockOutboxRepository);
  });

  describe('main', () => {
    test('GetOutboxesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get outboxes', async () => {
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
