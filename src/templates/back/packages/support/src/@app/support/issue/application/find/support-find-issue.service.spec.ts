import {
  SupportIIssueRepository,
  SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportFindIssueService } from '@app/support/issue/application/find/support-find-issue.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueService', () => {
  let service: SupportFindIssueService;
  let repository: SupportIIssueRepository;
  let mockRepository: SupportMockIssueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        SupportFindIssueService,
        SupportMockIssueRepository,
        {
          provide: SupportIIssueRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(SupportFindIssueService);
    repository = module.get(SupportIIssueRepository);
    mockRepository = module.get(SupportMockIssueRepository);
  });

  describe('main', () => {
    test('SupportFindIssueService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find issue', async () => {
      jest
        .spyOn(repository, 'find')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource[0]);
    });
  });
});
