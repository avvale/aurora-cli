import {
  WhatsappIMessageRepository,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappMaxMessageService } from '@app/whatsapp/message/application/max/whatsapp-max-message.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappMaxMessageService', () => {
  let service: WhatsappMaxMessageService;
  let repository: WhatsappIMessageRepository;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappMaxMessageService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            max: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappMaxMessageService);
    repository = module.get(WhatsappIMessageRepository);
    mockRepository = module.get(WhatsappMockMessageRepository);
  });

  describe('main', () => {
    test('WhatsappMaxMessageService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should max inboxes', async () => {
      jest
        .spyOn(repository, 'max')
        .mockImplementation(
          (column: string) =>
            new Promise((resolve) => resolve(mockRepository.max(column))),
        );
      expect(await service.main('id')).toBe(mockRepository.max('id'));
    });
  });
});
