/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageDeleteInboxesHandler,
  MessageDeleteInboxesResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageDeleteInboxesResolver', () => {
  let resolver: MessageDeleteInboxesResolver;
  let handler: MessageDeleteInboxesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageDeleteInboxesResolver,
        {
          provide: MessageDeleteInboxesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageDeleteInboxesResolver>(
      MessageDeleteInboxesResolver,
    );
    handler = module.get<MessageDeleteInboxesHandler>(
      MessageDeleteInboxesHandler,
    );
  });

  test('MessageDeleteInboxesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageDeleteInboxesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an messageMockInboxData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData)),
        );
      expect(await resolver.main()).toBe(messageMockInboxData);
    });
  });
});
