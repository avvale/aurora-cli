/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsDeleteWebhookByIdHandler,
  ToolsDeleteWebhookByIdResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsDeleteWebhookByIdResolver', () => {
  let resolver: ToolsDeleteWebhookByIdResolver;
  let handler: ToolsDeleteWebhookByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDeleteWebhookByIdResolver,
        {
          provide: ToolsDeleteWebhookByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsDeleteWebhookByIdResolver>(
      ToolsDeleteWebhookByIdResolver,
    );
    handler = module.get<ToolsDeleteWebhookByIdHandler>(
      ToolsDeleteWebhookByIdHandler,
    );
  });

  test('ToolsDeleteWebhookByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsDeleteWebhookByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an webhook deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookData[0])),
        );
      expect(await resolver.main(toolsMockWebhookData[0].id)).toBe(
        toolsMockWebhookData[0],
      );
    });
  });
});
