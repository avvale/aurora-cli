/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WhatsappDeleteConversationByIdHandler,
  WhatsappDeleteConversationByIdResolver,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappDeleteConversationByIdResolver', () => {
  let resolver: WhatsappDeleteConversationByIdResolver;
  let handler: WhatsappDeleteConversationByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappDeleteConversationByIdResolver,
        {
          provide: WhatsappDeleteConversationByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappDeleteConversationByIdResolver>(
      WhatsappDeleteConversationByIdResolver,
    );
    handler = module.get<WhatsappDeleteConversationByIdHandler>(
      WhatsappDeleteConversationByIdHandler,
    );
  });

  test('WhatsappDeleteConversationByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappDeleteConversationByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an conversation deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(await resolver.main(whatsappMockConversationData[0].id)).toBe(
        whatsappMockConversationData[0],
      );
    });
  });
});
