/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageUpdateInboxByIdInput } from '@api/graphql';
import {
  MessageUpdateInboxByIdHandler,
  MessageUpdateInboxByIdResolver,
} from '@api/message/inbox';
import { messageMockInboxData } from '@app/message/inbox';
import { Test, TestingModule } from '@nestjs/testing';

describe('MessageUpdateInboxByIdResolver', () => {
  let resolver: MessageUpdateInboxByIdResolver;
  let handler: MessageUpdateInboxByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        MessageUpdateInboxByIdResolver,
        {
          provide: MessageUpdateInboxByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<MessageUpdateInboxByIdResolver>(
      MessageUpdateInboxByIdResolver,
    );
    handler = module.get<MessageUpdateInboxByIdHandler>(
      MessageUpdateInboxByIdHandler,
    );
  });

  test('MessageUpdateInboxByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('MessageUpdateInboxByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a inbox by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(messageMockInboxData[0])),
        );
      expect(
        await resolver.main(
          <MessageUpdateInboxByIdInput>messageMockInboxData[0],
        ),
      ).toBe(messageMockInboxData[0]);
    });
  });
});
