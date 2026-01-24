/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageDeleteInboxByIdHandler,
  MessageDeleteInboxByIdResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxByIdResolver', () => {
  let resolver: MessageDeleteInboxByIdResolver;
  let handler: MessageDeleteInboxByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageDeleteInboxByIdResolver,
        {
          provide: MessageDeleteInboxByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageDeleteInboxByIdResolver>(
      MessageDeleteInboxByIdResolver,
    );
    handler = module.get<MessageDeleteInboxByIdHandler>(
      MessageDeleteInboxByIdHandler,
    );
  });

  test('MessageDeleteInboxByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageDeleteInboxByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an inbox deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData[0])),
        );
      expect(await resolver.main(messageMockInboxData[0].id)).toBe(
        messageMockInboxData[0],
      );
    });
  });
});
