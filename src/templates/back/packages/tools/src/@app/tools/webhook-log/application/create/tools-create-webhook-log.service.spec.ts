/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsIWebhookLogRepository,
  toolsMockWebhookLogData,
  ToolsMockWebhookLogRepository,
} from '@app/tools/webhook-log';
import { ToolsCreateWebhookLogService } from '@app/tools/webhook-log/application/create/tools-create-webhook-log.service';
import {
  ToolsWebhookLogBodyRequest,
  ToolsWebhookLogHeaderRequest,
  ToolsWebhookLogId,
  ToolsWebhookLogRowId,
  ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogService', () => {
  let service: ToolsCreateWebhookLogService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        ToolsCreateWebhookLogService,
        ToolsMockWebhookLogRepository,
        {
          provide: ToolsIWebhookLogRepository,
          useValue: {
            create: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(ToolsCreateWebhookLogService);
  });

  describe('main', () => {
    test('ToolsCreateWebhookLogService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create a webhookLog and emit event', async () => {
      expect(
        await service.main({
          id: new ToolsWebhookLogId(toolsMockWebhookLogData[0].id),
          rowId: new ToolsWebhookLogRowId(toolsMockWebhookLogData[0].rowId),
          url: new ToolsWebhookLogUrl(toolsMockWebhookLogData[0].url),
          headerRequest: new ToolsWebhookLogHeaderRequest(
            toolsMockWebhookLogData[0].headerRequest,
          ),
          bodyRequest: new ToolsWebhookLogBodyRequest(
            toolsMockWebhookLogData[0].bodyRequest,
          ),
        }),
      ).toBe(undefined);
    });
  });
});
