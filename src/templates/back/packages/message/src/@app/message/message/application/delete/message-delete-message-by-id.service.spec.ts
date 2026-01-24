/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageIMessageRepository,
  messageMockMessageData,
  MessageMockMessageRepository,
} from '@app/message/message';
import { MessageDeleteMessageByIdService } from '@app/message/message/application/delete/message-delete-message-by-id.service';
import { MessageMessageId } from '@app/message/message/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessageByIdService', () => {
  let service: MessageDeleteMessageByIdService;
  let repository: MessageIMessageRepository;
  let mockRepository: MessageMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageDeleteMessageByIdService,
        MessageMockMessageRepository,
        {
          provide: MessageIMessageRepository,
          useValue: {
            deleteById: (id) => {
              /**/
            },
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageDeleteMessageByIdService);
    repository = module.get(MessageIMessageRepository);
    mockRepository = module.get(MessageMockMessageRepository);
  });

  describe('main', () => {
    test('MessageDeleteMessageByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete message and emit event', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(
          new MessageMessageId(messageMockMessageData[0].id),
          {},
        ),
      ).toBe(undefined);
    });
  });
});
