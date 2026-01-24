/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportPaginateCommentsHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateCommentsHandler', () => {
  let handler: SupportPaginateCommentsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportPaginateCommentsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<SupportPaginateCommentsHandler>(
      SupportPaginateCommentsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('SupportPaginateCommentsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('SupportPaginateCommentsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a comments', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: supportMockCommentData.length,
              count: supportMockCommentData.length,
              rows: supportMockCommentData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: supportMockCommentData.length,
        count: supportMockCommentData.length,
        rows: supportMockCommentData,
      });
    });
  });
});
