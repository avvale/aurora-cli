/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappIConversationRepository,
  WhatsappMockConversationRepository,
} from '@app/whatsapp/conversation';
import { WhatsappDeleteConversationsService } from '@app/whatsapp/conversation/application/delete/whatsapp-delete-conversations.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationsService', () => {
  let service: WhatsappDeleteConversationsService;
  let repository: WhatsappIConversationRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappDeleteConversationsService,
        WhatsappMockConversationRepository,
        {
          provide: WhatsappIConversationRepository,
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

    service = module.get(WhatsappDeleteConversationsService);
    repository = module.get(WhatsappIConversationRepository);
  });

  describe('main', () => {
    test('WhatsappDeleteConversationsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete conversation and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
