import { ToolsCreateWebhookLogInput } from '@api/graphql';
import {
  ToolsCreateWebhookLogsHandler,
  ToolsCreateWebhookLogsResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogsResolver', () => {
  let resolver: ToolsCreateWebhookLogsResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateWebhookLogsResolver,
        {
          provide: ToolsCreateWebhookLogsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsCreateWebhookLogsResolver>(
      ToolsCreateWebhookLogsResolver,
    );
  });

  test('ToolsCreateWebhookLogsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsCreateWebhookLogsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an webhookLogs created', async () => {
      expect(
        await resolver.main(
          <ToolsCreateWebhookLogInput[]>toolsMockWebhookLogData,
        ),
      ).toBe(undefined);
    });
  });
});
