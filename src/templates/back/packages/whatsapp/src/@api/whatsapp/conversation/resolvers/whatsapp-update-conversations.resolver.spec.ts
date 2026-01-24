/* eslint-disable @typescript-eslint/no-unused-vars */
import { WhatsappUpdateConversationsInput } from '@api/graphql';
import {
  WhatsappUpdateConversationsHandler,
  WhatsappUpdateConversationsResolver,
} from '@api/whatsapp/conversation';
import { whatsappMockConversationData } from '@app/whatsapp/conversation';
import { Test, TestingModule } from '@nestjs/testing';

describe('WhatsappUpdateConversationsResolver', () => {
  let resolver: WhatsappUpdateConversationsResolver;
  let handler: WhatsappUpdateConversationsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        WhatsappUpdateConversationsResolver,
        {
          provide: WhatsappUpdateConversationsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<WhatsappUpdateConversationsResolver>(
      WhatsappUpdateConversationsResolver,
    );
    handler = module.get<WhatsappUpdateConversationsHandler>(
      WhatsappUpdateConversationsHandler,
    );
  });

  test('WhatsappUpdateConversationsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('WhatsappUpdateConversationsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a conversations updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(whatsappMockConversationData[0])),
        );
      expect(
        await resolver.main(
          <WhatsappUpdateConversationsInput>whatsappMockConversationData[0],
        ),
      ).toBe(whatsappMockConversationData[0]);
    });
  });
});
