/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteMessagesHandler,
  WhatsappDeleteMessagesResolver,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessagesResolver', () => {
  let resolver: WhatsappDeleteMessagesResolver;
  let handler: WhatsappDeleteMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteMessagesResolver,
        {
          provide: WhatsappDeleteMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappDeleteMessagesResolver>(
      WhatsappDeleteMessagesResolver,
    );
    handler = module.get<WhatsappDeleteMessagesHandler>(
      WhatsappDeleteMessagesHandler,
    );
  });

  test('WhatsappDeleteMessagesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteMessagesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an whatsappMockMessageData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData)),
        );
      expect(await resolver.main()).toBe(whatsappMockMessageData);
    });
  });
});
