/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxesInput } from '@api/graphql';
import {
  MessageUpdateInboxesHandler,
  MessageUpdateInboxesResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxesResolver', () => {
  let resolver: MessageUpdateInboxesResolver;
  let handler: MessageUpdateInboxesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageUpdateInboxesResolver,
        {
          provide: MessageUpdateInboxesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageUpdateInboxesResolver>(
      MessageUpdateInboxesResolver,
    );
    handler = module.get<MessageUpdateInboxesHandler>(
      MessageUpdateInboxesHandler,
    );
  });

  test('MessageUpdateInboxesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageUpdateInboxesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a inboxes updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData[0])),
        );
      expect(
        await resolver.main(<MessageUpdateInboxesInput>messageMockInboxData[0]),
      ).toBe(messageMockInboxData[0]);
    });
  });
});
