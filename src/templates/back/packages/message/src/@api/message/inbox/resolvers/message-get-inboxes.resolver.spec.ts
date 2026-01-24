/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  MessageGetInboxesHandler,
  MessageGetInboxesResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageGetInboxesResolver', () => {
  let resolver: MessageGetInboxesResolver;
  let handler: MessageGetInboxesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageGetInboxesResolver,
        {
          provide: MessageGetInboxesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageGetInboxesResolver>(MessageGetInboxesResolver);
    handler = module.get<MessageGetInboxesHandler>(MessageGetInboxesHandler);
  });

  test('MessageGetInboxesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageGetInboxesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a messageMockInboxData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData)),
        );
      expect(await resolver.main()).toBe(messageMockInboxData);
    });
  });
});
