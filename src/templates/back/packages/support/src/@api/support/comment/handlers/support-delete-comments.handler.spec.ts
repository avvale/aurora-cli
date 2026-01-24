/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportDeleteCommentsHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentsHandler', () => {
  let handler: SupportDeleteCommentsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportDeleteCommentsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<SupportDeleteCommentsHandler>(
      SupportDeleteCommentsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('SupportDeleteCommentsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('SupportDeleteCommentsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an supportMockCommentData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        supportMockCommentData,
      );
    });
  });
});
