import {
  ToolsIWebhookLogRepository,
  ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsGetWebhookLogsService } from '@app/tools/webhook-log/application/get/tools-get-webhook-logs.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhookLogsService', () => {
  let service: ToolsGetWebhookLogsService;
  let repository: ToolsIWebhookLogRepository;
  let mockRepository: ToolsMockWebhookLogRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsGetWebhookLogsService,
        ToolsMockWebhookLogRepository,
        {
          provide: ToolsIWebhookLogRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsGetWebhookLogsService);
    repository = module.get(ToolsIWebhookLogRepository);
    mockRepository = module.get(ToolsMockWebhookLogRepository);
  });

  describe('main', () => {
    test('GetWebhookLogsService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get webhookLogs', async () => {
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
