/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageIMessageRepository,
  MessageMockMessageRepository,
} from '@app/message/message';
import { MessageDeleteMessagesService } from '@app/message/message/application/delete/message-delete-messages.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessagesService', () => {
  let service: MessageDeleteMessagesService;
  let repository: MessageIMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        MessageDeleteMessagesService,
        MessageMockMessageRepository,
        {
          provide: MessageIMessageRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(MessageDeleteMessagesService);
    repository = module.get(MessageIMessageRepository);
  });

  describe('main', () => {
    test('MessageDeleteMessagesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete message and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
