/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateMessagesInput } from '@api/graphql';
import {
  WhatsappUpdateMessagesHandler,
  WhatsappUpdateMessagesResolver,
} from '@api/whatsapp/message';
import { whatsappMockMessageData } from '@app/whatsapp/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateMessagesResolver', () => {
  let resolver: WhatsappUpdateMessagesResolver;
  let handler: WhatsappUpdateMessagesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappUpdateMessagesResolver,
        {
          provide: WhatsappUpdateMessagesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappUpdateMessagesResolver>(
      WhatsappUpdateMessagesResolver,
    );
    handler = module.get<WhatsappUpdateMessagesHandler>(
      WhatsappUpdateMessagesHandler,
    );
  });

  test('WhatsappUpdateMessagesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappUpdateMessagesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a messages updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(whatsappMockMessageData[0])),
        );
      expect(
        await resolver.main(
          <WhatsappUpdateMessagesInput>whatsappMockMessageData[0],
        ),
      ).toBe(whatsappMockMessageData[0]);
    });
  });
});
