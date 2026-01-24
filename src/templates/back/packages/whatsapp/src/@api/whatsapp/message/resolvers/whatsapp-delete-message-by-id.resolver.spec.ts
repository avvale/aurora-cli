/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteMessageByIdHandler,
  WhatsappDeleteMessageByIdResolver,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteMessageByIdResolver', () => {
  let resolver: WhatsappDeleteMessageByIdResolver;
  let handler: WhatsappDeleteMessageByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteMessageByIdResolver,
        {
          provide: WhatsappDeleteMessageByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappDeleteMessageByIdResolver>(
      WhatsappDeleteMessageByIdResolver,
    );
    handler = module.get<WhatsappDeleteMessageByIdHandler>(
      WhatsappDeleteMessageByIdHandler,
    );
  });

  test('WhatsappDeleteMessageByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteMessageByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an message deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(await resolver.main(whatsappMockMessageData[0].id)).toBe(
        whatsappMockMessageData[0],
      );
    });
  });
});
