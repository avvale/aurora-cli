import {
  SupportFindIssueByIdQuery,
  SupportIIssueRepository,
  SupportIssueMapper,
  supportMockIssueData,
  SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportFindIssueByIdQueryHandler } from '@app/support/issue/application/find/support-find-issue-by-id.query-handler';
import { SupportFindIssueByIdService } from '@app/support/issue/application/find/support-find-issue-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueByIdQueryHandler', () => {
  let queryHandler: SupportFindIssueByIdQueryHandler;
  let service: SupportFindIssueByIdService;
  let repository: SupportMockIssueRepository;
  let mapper: SupportIssueMapper;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportFindIssueByIdQueryHandler,
        {
          provide: SupportIIssueRepository,
          useClass: SupportMockIssueRepository,
        },
        {
          provide: SupportFindIssueByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    queryHandler = module.get<SupportFindIssueByIdQueryHandler>(
      SupportFindIssueByIdQueryHandler,
    );
    service = module.get<SupportFindIssueByIdService>(
      SupportFindIssueByIdService,
    );
    repository = <SupportMockIssueRepository>(
      module.get<SupportIIssueRepository>(SupportIIssueRepository)
    );
    mapper = new SupportIssueMapper();
  });

  describe('main', () => {
    test('FindIssueByIdQueryHandler should be defined', () => {
      expect(queryHandler).toBeDefined();
    });

    test('should return an issue founded', async () => {
      jest
        .spyOn(service, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(repository.collectionSource[0])),
        );
      expect(
        await queryHandler.execute(
          new SupportFindIssueByIdQuery(supportMockIssueData[0].id),
        ),
      ).toStrictEqual(
        mapper.mapAggregateToResponse(repository.collectionSource[0]),
      );
    });
  });
});
