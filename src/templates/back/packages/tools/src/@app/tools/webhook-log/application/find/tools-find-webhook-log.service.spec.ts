import {
  ToolsIWebhookLogRepository,
  ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsFindWebhookLogService } from '@app/tools/webhook-log/application/find/tools-find-webhook-log.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogService', () => {
  let service: ToolsFindWebhookLogService;
  let repository: ToolsIWebhookLogRepository;
  let mockRepository: ToolsMockWebhookLogRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsFindWebhookLogService,
        ToolsMockWebhookLogRepository,
        {
          provide: ToolsIWebhookLogRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsFindWebhookLogService);
    repository = module.get(ToolsIWebhookLogRepository);
    mockRepository = module.get(ToolsMockWebhookLogRepository);
  });

  describe('main', () => {
    test('ToolsFindWebhookLogService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find webhookLog', async () => {
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
