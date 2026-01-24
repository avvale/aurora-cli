import {
  SupportICommentRepository,
  SupportMockCommentRepository,
} from '@app/support/comment';
import { SupportFindCommentService } from '@app/support/comment/application/find/support-find-comment.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentService', () => {
  let service: SupportFindCommentService;
  let repository: SupportICommentRepository;
  let mockRepository: SupportMockCommentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        SupportFindCommentService,
        SupportMockCommentRepository,
        {
          provide: SupportICommentRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(SupportFindCommentService);
    repository = module.get(SupportICommentRepository);
    mockRepository = module.get(SupportMockCommentRepository);
  });

  describe('main', () => {
    test('SupportFindCommentService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find comment', async () => {
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
