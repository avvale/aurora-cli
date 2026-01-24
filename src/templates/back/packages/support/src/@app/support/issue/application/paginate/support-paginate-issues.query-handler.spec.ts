import {
  SupportIIssueRepository,
  SupportMockIssueRepository,
  SupportPaginateIssuesQuery,
} from '@app/support/issue';
import { SupportPaginateIssuesQueryHandler } from '@app/support/issue/application/paginate/support-paginate-issues.query-handler';
import { SupportPaginateIssuesService } from '@app/support/issue/application/paginate/support-paginate-issues.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateIssuesQueryHandler', () => {
  let queryHandler: SupportPaginateIssuesQueryHandler;
  let service: SupportPaginateIssuesService;
  let repository: SupportMockIssueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportPaginateIssuesQueryHandler,
        {
          provide: SupportIIssueRepository,
          useClass: SupportMockIssueRepository,
        },
        {
          provide: SupportPaginateIssuesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<SupportPaginateIssuesQueryHandler>(
      SupportPaginateIssuesQueryHandler,
    );
    service = module.get<SupportPaginateIssuesService>(
      SupportPaginateIssuesService,
    );
    repository = <SupportMockIssueRepository>(
      module.get<SupportIIssueRepository>(SupportIIssueRepository)
    );
  });

  describe('main', () => {
    test('SupportPaginateIssuesQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an issues paginated', async () => {
      jest.spyOn(service, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              count: 10,
              total: 100,
              rows: repository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await queryHandler.execute(
          new SupportPaginateIssuesQuery({
            offset: 0,
            limit: 10,
          }),
        ),
      ).toStrictEqual(
        new PaginationResponse(
          100,
          10,
          repository.collectionSource.slice(0, 10).map((item) => item.toDTO()),
        ),
      );
    });
  });
});
