/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappCreateMessagesService } from '@app/whatsapp/message/application/create/whatsapp-create-messages.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappCreateMessagesService', () => {
  let service: WhatsappCreateMessagesService;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappCreateMessagesService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappCreateMessagesService);
    mockRepository = module.get(WhatsappMockMessageRepository);
  });

  describe('main', () => {
    test('CreateMessagesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create messages and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
