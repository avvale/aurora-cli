/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SupportCreateWebhookConfigHandler } from '../handlers/support-create-webhook-config.handler';
import { SupportCreateWebhookConfigController } from './support-create-webhook-config.controller';

describe('SupportCreateWebhookConfigController', () => {
  let controller: SupportCreateWebhookConfigController;
  let handler: SupportCreateWebhookConfigHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportCreateWebhookConfigController],
      providers: [
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

    controller = module.get<SupportCreateWebhookConfigController>(
      SupportCreateWebhookConfigController,
    );
    handler = module.get<SupportCreateWebhookConfigHandler>(
      SupportCreateWebhookConfigHandler,
    );
  });

  describe('main', () => {
    test('SupportCreateWebhookConfigController should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
