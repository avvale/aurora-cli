/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToolsCreateWebhookLogInput } from '@api/graphql';
import {
  ToolsCreateWebhookLogHandler,
  ToolsCreateWebhookLogResolver,
} from '@api/tools/webhook-log';
import { toolsMockWebhookLogData } from '@app/tools/webhook-log';
import { Test, TestingModule } from '@nestjs/testing';

describe('ToolsCreateWebhookLogResolver', () => {
  let resolver: ToolsCreateWebhookLogResolver;
  let handler: ToolsCreateWebhookLogHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsCreateWebhookLogResolver,
        {
          provide: ToolsCreateWebhookLogHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsCreateWebhookLogResolver>(
      ToolsCreateWebhookLogResolver,
    );
    handler = module.get<ToolsCreateWebhookLogHandler>(
      ToolsCreateWebhookLogHandler,
    );
  });

  test('ToolsCreateWebhookLogResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsCreateWebhookLogResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an webhookLog created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(toolsMockWebhookLogData[0])),
        );
      expect(
        await resolver.main(
          <ToolsCreateWebhookLogInput>toolsMockWebhookLogData[0],
        ),
      ).toBe(toolsMockWebhookLogData[0]);
    });
  });
});
