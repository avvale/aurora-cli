/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportPaginateIssuesHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateIssuesHandler', () => {
  let handler: SupportPaginateIssuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportPaginateIssuesHandler,
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

    handler = module.get<SupportPaginateIssuesHandler>(
      SupportPaginateIssuesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('SupportPaginateIssuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('SupportPaginateIssuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a issues', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: supportMockIssueData.length,
              count: supportMockIssueData.length,
              rows: supportMockIssueData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: supportMockIssueData.length,
        count: supportMockIssueData.length,
        rows: supportMockIssueData,
      });
    });
  });
});
