/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageDeleteMessageByIdHandler,
  MessageDeleteMessageByIdResolver,
} from '@api/message/message';
import { messageMockMessageData } from '@app/message/message';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteMessageByIdResolver', () => {
  let resolver: MessageDeleteMessageByIdResolver;
  let handler: MessageDeleteMessageByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageDeleteMessageByIdResolver,
        {
          provide: MessageDeleteMessageByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageDeleteMessageByIdResolver>(
      MessageDeleteMessageByIdResolver,
    );
    handler = module.get<MessageDeleteMessageByIdHandler>(
      MessageDeleteMessageByIdHandler,
    );
  });

  test('MessageDeleteMessageByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageDeleteMessageByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an message deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockMessageData[0])),
        );
      expect(await resolver.main(messageMockMessageData[0].id)).toBe(
        messageMockMessageData[0],
      );
    });
  });
});
