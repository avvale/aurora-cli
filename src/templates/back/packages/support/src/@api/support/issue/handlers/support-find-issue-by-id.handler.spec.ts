/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportFindIssueByIdHandler } from '@api/support/issue';
import { supportMockIssueData } from '@app/support/issue';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueByIdHandler', () => {
  let handler: SupportFindIssueByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportFindIssueByIdHandler,
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

    handler = module.get<SupportFindIssueByIdHandler>(
      SupportFindIssueByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('SupportFindIssueByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('SupportFindIssueByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an issue by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockIssueData[0])),
        );
      expect(
        await handler.main(supportMockIssueData[0].id, {}, 'Europe/Madrid'),
      ).toBe(supportMockIssueData[0]);
    });
  });
});
