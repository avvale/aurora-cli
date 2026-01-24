import {
  MessageIMessageRepository,
  MessageMockMessageRepository,
} from '@app/message/message';
import { MessageGetMessagesService } from '@app/message/message/application/get/message-get-messages.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetMessagesService', () => {
  let service: MessageGetMessagesService;
  let repository: MessageIMessageRepository;
  let mockRepository: MessageMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageGetMessagesService,
        MessageMockMessageRepository,
        {
          provide: MessageIMessageRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageGetMessagesService);
    repository = module.get(MessageIMessageRepository);
    mockRepository = module.get(MessageMockMessageRepository);
  });

  describe('main', () => {
    test('GetMessagesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get messages', async () => {
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
