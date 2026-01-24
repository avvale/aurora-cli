/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsGetWebhooksHandler,
  ToolsGetWebhooksResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsGetWebhooksResolver', () => {
  let resolver: ToolsGetWebhooksResolver;
  let handler: ToolsGetWebhooksHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsGetWebhooksResolver,
        {
          provide: ToolsGetWebhooksHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsGetWebhooksResolver>(ToolsGetWebhooksResolver);
    handler = module.get<ToolsGetWebhooksHandler>(ToolsGetWebhooksHandler);
  });

  test('ToolsGetWebhooksResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsGetWebhooksResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a toolsMockWebhookData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookData)),
        );
      expect(await resolver.main()).toBe(toolsMockWebhookData);
    });
  });
});
