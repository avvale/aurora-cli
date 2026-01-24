/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsPaginateWebhooksHandler,
  ToolsPaginateWebhooksResolver,
} from '@api/tools/webhook';
import { toolsMockWebhookData } from '@app/tools/webhook';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsPaginateWebhooksResolver', () => {
  let resolver: ToolsPaginateWebhooksResolver;
  let handler: ToolsPaginateWebhooksHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsPaginateWebhooksResolver,
        {
          provide: ToolsPaginateWebhooksHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsPaginateWebhooksResolver>(
      ToolsPaginateWebhooksResolver,
    );
    handler = module.get<ToolsPaginateWebhooksHandler>(
      ToolsPaginateWebhooksHandler,
    );
  });

  test('ToolsPaginateWebhooksResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsPaginateWebhooksResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a toolsMockWebhookData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: toolsMockWebhookData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: toolsMockWebhookData,
      });
    });
  });
});
