import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappMinMessageService } from '@app/whatsapp/message/application/min/whatsapp-min-message.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMinMessageService', () => {
  let service: WhatsappMinMessageService;
  let repository: WhatsappIMessageRepository;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappMinMessageService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            min: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappMinMessageService);
    repository = module.get(WhatsappIMessageRepository);
    mockRepository = module.get(WhatsappMockMessageRepository);
  });

  describe('main', () => {
    test('WhatsappMinMessageService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should min inboxes', async () => {
      jest
        .spyOn(repository, 'min')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(mockRepository.min(column))),
        );
      expect(await service.main('id')).toBe(mockRepository.min('id'));
    });
  });
});
