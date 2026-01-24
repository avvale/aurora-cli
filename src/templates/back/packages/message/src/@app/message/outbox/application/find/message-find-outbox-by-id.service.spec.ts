import {
  MessageIOutboxRepository,
  messageMockOutboxData,
  MessageMockOutboxRepository,
} from '@app/message/outbox';
import { MessageFindOutboxByIdService } from '@app/message/outbox/application/find/message-find-outbox-by-id.service';
import { MessageOutboxId } from '@app/message/outbox/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindOutboxByIdService', () => {
  let service: MessageFindOutboxByIdService;
  let repository: MessageIOutboxRepository;
  let mockRepository: MessageMockOutboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageFindOutboxByIdService,
        MessageMockOutboxRepository,
        {
          provide: MessageIOutboxRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageFindOutboxByIdService);
    repository = module.get(MessageIOutboxRepository);
    mockRepository = module.get(MessageMockOutboxRepository);
  });

  describe('main', () => {
    test('FindOutboxByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find outbox by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new MessageOutboxId(messageMockOutboxData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
