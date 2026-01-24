/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsUpdateWebhookByIdInput } from '@api/graphql';
import { ToolsUpdateWebhookByIdHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsUpdateWebhookByIdHandler', () => {
  let handler: ToolsUpdateWebhookByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsUpdateWebhookByIdHandler,
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

    handler = module.get<ToolsUpdateWebhookByIdHandler>(
      ToolsUpdateWebhookByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('ToolsUpdateWebhookByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('ToolsUpdateWebhookByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a webhook updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookData[0])),
        );
      expect(
        await handler.main(
          <ToolsUpdateWebhookByIdInput>toolsMockWebhookData[0],
          {},
          'Europe/Madrid',
        ),
      ).toBe(toolsMockWebhookData[0]);
    });
  });
});
