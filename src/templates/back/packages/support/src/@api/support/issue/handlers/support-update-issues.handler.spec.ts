/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateIssuesInput } from '@api/graphql';
import { SupportUpdateIssuesHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateIssuesHandler', () => {
  let handler: SupportUpdateIssuesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportUpdateIssuesHandler,
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

    handler = module.get<SupportUpdateIssuesHandler>(
      SupportUpdateIssuesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('SupportUpdateIssuesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('SupportUpdateIssuesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a issues updated', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(
        await handler.main(
          <SupportUpdateIssuesInput>supportMockIssueData[0],
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(supportMockIssueData[0]);
    });
  });
});
