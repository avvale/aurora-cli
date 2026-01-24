/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateWebhookHandler } from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookHandler', () => {
  let handler: ToolsCreateWebhookHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsCreateWebhookHandler,
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

    handler = module.get<ToolsCreateWebhookHandler>(ToolsCreateWebhookHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('ToolsCreateWebhookHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an webhook created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookData[0])),
        );
      expect(await handler.main(toolsMockWebhookData[0], 'Europe/Madrid')).toBe(
        toolsMockWebhookData[0],
      );
    });
  });
});
