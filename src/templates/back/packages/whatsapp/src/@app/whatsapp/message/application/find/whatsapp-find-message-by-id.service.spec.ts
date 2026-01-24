import {
  WhatsappIMessageRepository,
  whatsappMockMessageData,
  WhatsappMockMessageRepository,
} from '@app/whatsapp/message';
import { WhatsappFindMessageByIdService } from '@app/whatsapp/message/application/find/whatsapp-find-message-by-id.service';
import { WhatsappMessageId } from '@app/whatsapp/message/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageByIdService', () => {
  let service: WhatsappFindMessageByIdService;
  let repository: WhatsappIMessageRepository;
  let mockRepository: WhatsappMockMessageRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        WhatsappFindMessageByIdService,
        WhatsappMockMessageRepository,
        {
          provide: WhatsappIMessageRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(WhatsappFindMessageByIdService);
    repository = module.get(WhatsappIMessageRepository);
    mockRepository = module.get(WhatsappMockMessageRepository);
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
        await service.main(
          new WhatsappMessageId(whatsappMockMessageData[0].id),
        ),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
