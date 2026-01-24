import {
  SupportIIssueRepository,
  SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportGetIssuesService } from '@app/support/issue/application/get/support-get-issues.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetIssuesService', () => {
  let service: SupportGetIssuesService;
  let repository: SupportIIssueRepository;
  let mockRepository: SupportMockIssueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        SupportGetIssuesService,
        SupportMockIssueRepository,
        {
          provide: SupportIIssueRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(SupportGetIssuesService);
    repository = module.get(SupportIIssueRepository);
    mockRepository = module.get(SupportMockIssueRepository);
  });

  describe('main', () => {
    test('GetIssuesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get issues', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
