import {
  ToolsIWebhookRepository,
  ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsFindWebhookService } from '@app/tools/webhook/application/find/tools-find-webhook.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookService', () => {
  let service: ToolsFindWebhookService;
  let repository: ToolsIWebhookRepository;
  let mockRepository: ToolsMockWebhookRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsFindWebhookService,
        ToolsMockWebhookRepository,
        {
          provide: ToolsIWebhookRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsFindWebhookService);
    repository = module.get(ToolsIWebhookRepository);
    mockRepository = module.get(ToolsMockWebhookRepository);
  });

  describe('main', () => {
    test('ToolsFindWebhookService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find webhook', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
