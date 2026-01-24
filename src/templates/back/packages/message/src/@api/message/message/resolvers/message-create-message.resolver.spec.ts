/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCreateMessageInput } from '@api/graphql';
import {
  MessageCreateMessageHandler,
  MessageCreateMessageResolver,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageCreateMessageResolver', () => {
  let resolver: MessageCreateMessageResolver;
  let handler: MessageCreateMessageHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageCreateMessageResolver,
        {
          provide: MessageCreateMessageHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageCreateMessageResolver>(
      MessageCreateMessageResolver,
    );
    handler = module.get<MessageCreateMessageHandler>(
      MessageCreateMessageHandler,
    );
  });

  test('MessageCreateMessageResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageCreateMessageResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an message created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(
        await resolver.main(
          <MessageCreateMessageInput>messageMockMessageData[0],
        ),
      ).toBe(messageMockMessageData[0]);
    });
  });
});
