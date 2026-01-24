/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappDeleteMessagesService } from '@app/whatsapp/message/application/delete/whatsapp-delete-messages.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessagesService', () => {
  let service: WhatsappDeleteMessagesService;
  let repository: WhatsappIMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappDeleteMessagesService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
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

    service = module.get(WhatsappDeleteMessagesService);
    repository = module.get(WhatsappIMessageRepository);
  });

  describe('main', () => {
    test('WhatsappDeleteMessagesService should be defined', () => {
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
