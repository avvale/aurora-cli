/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateWebhookLogHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogHandler', () => {
  let handler: ToolsCreateWebhookLogHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsCreateWebhookLogHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
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

    handler = module.get<ToolsCreateWebhookLogHandler>(
      ToolsCreateWebhookLogHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('ToolsCreateWebhookLogHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an webhookLog created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData[0])),
        );
      expect(
        await handler.main(toolsMockWebhookLogData[0], 'Europe/Madrid'),
      ).toBe(toolsMockWebhookLogData[0]);
    });
  });
});
