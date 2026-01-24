import { ToolsCreateWebhooksHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhooksHandler', () => {
  let handler: ToolsCreateWebhooksHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsCreateWebhooksHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<ToolsCreateWebhooksHandler>(
      ToolsCreateWebhooksHandler,
    );
  });

  describe('main', () => {
    test('ToolsCreateWebhooksHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an toolsMockWebhookData created', async () => {
      expect(await handler.main(toolsMockWebhookData)).toBe(true);
    });
  });
});
