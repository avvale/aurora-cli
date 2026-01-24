/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ToolsDigestWebhookHandler } from '../handlers/tools-digest-webhook.handler';
import { ToolsDigestWebhookResolver } from './tools-digest-webhook.resolver';

describe('ToolsDigestWebhookResolver', () => {
  let resolver: ToolsDigestWebhookResolver;
  let handler: ToolsDigestWebhookHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ToolsDigestWebhookResolver,
        {
          provide: ToolsDigestWebhookHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<ToolsDigestWebhookResolver>(
      ToolsDigestWebhookResolver,
    );
    handler = module.get<ToolsDigestWebhookHandler>(ToolsDigestWebhookHandler);
  });

  test('ToolsDigestWebhookResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('ToolsDigestWebhookResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
