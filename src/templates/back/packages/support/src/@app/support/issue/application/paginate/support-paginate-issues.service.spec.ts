import {
  SupportIIssueRepository,
  SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportPaginateIssuesService } from '@app/support/issue/application/paginate/support-paginate-issues.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateIssuesService', () => {
  let service: SupportPaginateIssuesService;
  let repository: SupportIIssueRepository;
  let mockRepository: SupportMockIssueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        SupportPaginateIssuesService,
        SupportMockIssueRepository,
        {
          provide: SupportIIssueRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(SupportPaginateIssuesService);
    repository = module.get(SupportIIssueRepository);
    mockRepository = module.get(SupportMockIssueRepository);
  });

  describe('main', () => {
    test('SupportPaginateIssuesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate issues', async () => {
      jest.spyOn(repository, 'paginate').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: mockRepository.collectionSource.slice(0, 10).length,
              count: mockRepository.collectionSource.slice(0, 10).length,
              rows: mockRepository.collectionSource.slice(0, 10),
            }),
          ),
      );
      expect(
        await service.main({
          offset: 0,
          limit: 10,
        }),
      ).toStrictEqual({
        total: mockRepository.collectionSource.slice(0, 10).length,
        count: mockRepository.collectionSource.slice(0, 10).length,
        rows: mockRepository.collectionSource.slice(0, 10),
      });
    });
  });
});
