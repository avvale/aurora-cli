/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportGetIssuesHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetIssuesHandler', () => {
  let handler: SupportGetIssuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportGetIssuesHandler,
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

    handler = module.get<SupportGetIssuesHandler>(SupportGetIssuesHandler);
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('SupportGetIssuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('SupportGetIssuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a supportMockIssueData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        supportMockIssueData,
      );
    });
  });
});
