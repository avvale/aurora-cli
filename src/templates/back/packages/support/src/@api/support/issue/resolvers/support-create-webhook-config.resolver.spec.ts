/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SupportCreateWebhookConfigHandler } from '../handlers/support-create-webhook-config.handler';
import { SupportCreateWebhookConfigResolver } from './support-create-webhook-config.resolver';

describe('SupportCreateWebhookConfigResolver', () => {
  let resolver: SupportCreateWebhookConfigResolver;
  let handler: SupportCreateWebhookConfigHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportCreateWebhookConfigResolver,
        {
          provide: SupportCreateWebhookConfigHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<SupportCreateWebhookConfigResolver>(
      SupportCreateWebhookConfigResolver,
    );
    handler = module.get<SupportCreateWebhookConfigHandler>(
      SupportCreateWebhookConfigHandler,
    );
  });

  test('SupportCreateWebhookConfigResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportCreateWebhookConfigResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
