import {
  MessageIMessageRepository,
  messageMockMessageData,
  MessageMockMessageRepository,
} from '@app/message/message';
import { MessageFindMessageByIdService } from '@app/message/message/application/find/message-find-message-by-id.service';
import { MessageMessageId } from '@app/message/message/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageFindMessageByIdService', () => {
  let service: MessageFindMessageByIdService;
  let repository: MessageIMessageRepository;
  let mockRepository: MessageMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageFindMessageByIdService,
        MessageMockMessageRepository,
        {
          provide: MessageIMessageRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageFindMessageByIdService);
    repository = module.get(MessageIMessageRepository);
    mockRepository = module.get(MessageMockMessageRepository);
  });

  describe('main', () => {
    test('FindMessageByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find message by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new MessageMessageId(messageMockMessageData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
