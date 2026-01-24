/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsDeleteWebhookLogByIdHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookLogByIdController', () => {
  let handler: ToolsDeleteWebhookLogByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteWebhookLogByIdHandler,
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

    handler = module.get<ToolsDeleteWebhookLogByIdHandler>(
      ToolsDeleteWebhookLogByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('ToolsDeleteWebhookLogByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an webhookLog deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData[0])),
        );
      expect(
        await handler.main(toolsMockWebhookLogData[0].id, {}, 'Europe/Madrid'),
      ).toBe(toolsMockWebhookLogData[0]);
    });
  });
});
