/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIWebhookRepository,
  ToolsMockWebhookRepository,
} from '@app/tools/webhook';
import { ToolsCreateWebhooksService } from '@app/tools/webhook/application/create/tools-create-webhooks.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhooksService', () => {
  let service: ToolsCreateWebhooksService;
  let mockRepository: ToolsMockWebhookRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsCreateWebhooksService,
        ToolsMockWebhookRepository,
        {
          provide: ToolsIWebhookRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsCreateWebhooksService);
    mockRepository = module.get(ToolsMockWebhookRepository);
  });

  describe('main', () => {
    test('CreateWebhooksService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create webhooks and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
