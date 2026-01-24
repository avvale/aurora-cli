import { MessageCreateInboxInput } from '@api/graphql';
import {
  MessageCreateInboxesHandler,
  MessageCreateInboxesResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateInboxesResolver', () => {
  let resolver: MessageCreateInboxesResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageCreateInboxesResolver,
        {
          provide: MessageCreateInboxesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageCreateInboxesResolver>(
      MessageCreateInboxesResolver,
    );
  });

  test('MessageCreateInboxesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageCreateInboxesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an inboxes created', async () => {
      expect(
        await resolver.main(<MessageCreateInboxInput[]>messageMockInboxData),
      ).toBe(undefined);
    });
  });
});
