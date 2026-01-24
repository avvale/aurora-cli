/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappFindMessageHandler,
  WhatsappFindMessageResolver,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappFindMessageResolver', () => {
  let resolver: WhatsappFindMessageResolver;
  let handler: WhatsappFindMessageHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappFindMessageResolver,
        {
          provide: WhatsappFindMessageHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappFindMessageResolver>(
      WhatsappFindMessageResolver,
    );
    handler = module.get<WhatsappFindMessageHandler>(
      WhatsappFindMessageHandler,
    );
  });

  test('WhatsappFindMessageResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappFindMessageResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a message', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(await resolver.main()).toBe(whatsappMockMessageData[0]);
    });
  });
});
