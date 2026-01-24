/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SupportDeleteWebhookConfigHandler } from '../handlers/support-delete-webhook-config.handler';
import { SupportDeleteWebhookConfigResolver } from './support-delete-webhook-config.resolver';

describe('SupportDeleteWebhookConfigResolver', () => {
  let resolver: SupportDeleteWebhookConfigResolver;
  let handler: SupportDeleteWebhookConfigHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportDeleteWebhookConfigResolver,
        {
          provide: SupportDeleteWebhookConfigHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<SupportDeleteWebhookConfigResolver>(
      SupportDeleteWebhookConfigResolver,
    );
    handler = module.get<SupportDeleteWebhookConfigHandler>(
      SupportDeleteWebhookConfigHandler,
    );
  });

  test('SupportDeleteWebhookConfigResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportDeleteWebhookConfigResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
