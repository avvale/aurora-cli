/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ToolsFindWebhookLogHandler,
  ToolsFindWebhookLogResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsFindWebhookLogResolver', () => {
  let resolver: ToolsFindWebhookLogResolver;
  let handler: ToolsFindWebhookLogHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsFindWebhookLogResolver,
        {
          provide: ToolsFindWebhookLogHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsFindWebhookLogResolver>(
      ToolsFindWebhookLogResolver,
    );
    handler = module.get<ToolsFindWebhookLogHandler>(
      ToolsFindWebhookLogHandler,
    );
  });

  test('ToolsFindWebhookLogResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsFindWebhookLogResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a webhookLog', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData[0])),
        );
      expect(await resolver.main()).toBe(toolsMockWebhookLogData[0]);
    });
  });
});
