/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsFindWebhookLogByIdHandler } from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogByIdHandler', () => {
  let handler: ToolsFindWebhookLogByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsFindWebhookLogByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<ToolsFindWebhookLogByIdHandler>(
      ToolsFindWebhookLogByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsFindWebhookLogByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsFindWebhookLogByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an webhookLog by id', async () => {
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
