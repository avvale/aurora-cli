import {
  SupportIIssueRepository,
  supportMockIssueData,
  SupportMockIssueRepository,
} from '@app/support/issue';
import { SupportFindIssueByIdService } from '@app/support/issue/application/find/support-find-issue-by-id.service';
import { SupportIssueId } from '@app/support/issue/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindIssueByIdService', () => {
  let service: SupportFindIssueByIdService;
  let repository: SupportIIssueRepository;
  let mockRepository: SupportMockIssueRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        SupportFindIssueByIdService,
        SupportMockIssueRepository,
        {
          provide: SupportIIssueRepository,
          useValue: {
            findById: (id) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(SupportFindIssueByIdService);
    repository = module.get(SupportIIssueRepository);
    mockRepository = module.get(SupportMockIssueRepository);
  });

  describe('main', () => {
    test('FindIssueByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find issue by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(mockRepository.collectionSource[0]),
            ),
        );
      expect(
        await service.main(new SupportIssueId(supportMockIssueData[0].id)),
      ).toBe(mockRepository.collectionSource[0]);
    });
  });
});
