import {
  MessageIInboxRepository,
  messageMockInboxData,
  MessageMockInboxRepository,
} from '@app/message/inbox';
import { MessageFindInboxByIdService } from '@app/message/inbox/application/find/message-find-inbox-by-id.service';
import { MessageInboxId } from '@app/message/inbox/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindInboxByIdService', () => {
  let service: MessageFindInboxByIdService;
  let repository: MessageIInboxRepository;
  let mockRepository: MessageMockInboxRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageFindInboxByIdService,
        MessageMockInboxRepository,
        {
          provide: MessageIInboxRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageFindInboxByIdService);
    repository = module.get(MessageIInboxRepository);
    mockRepository = module.get(MessageMockInboxRepository);
  });

  describe('main', () => {
    test('FindInboxByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find inbox by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new MessageInboxId(messageMockInboxData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
