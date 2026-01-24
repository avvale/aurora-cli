import {
  ToolsIWebhookRepository,
  ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsGetWebhooksService } from '@app/tools/webhook/application/get/tools-get-webhooks.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhooksService', () => {
  let service: ToolsGetWebhooksService;
  let repository: ToolsIWebhookRepository;
  let mockRepository: ToolsMockWebhookRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsGetWebhooksService,
        ToolsMockWebhookRepository,
        {
          provide: ToolsIWebhookRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsGetWebhooksService);
    repository = module.get(ToolsIWebhookRepository);
    mockRepository = module.get(ToolsMockWebhookRepository);
  });

  describe('main', () => {
    test('GetWebhooksService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get webhooks', async () => {
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
