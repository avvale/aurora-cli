import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonFindAttachmentLibraryService } from '@app/common/attachment-library/application/find/common-find-attachment-library.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryService', () => {
  let service: CommonFindAttachmentLibraryService;
  let repository: CommonIAttachmentLibraryRepository;
  let mockRepository: CommonMockAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonFindAttachmentLibraryService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            find: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonFindAttachmentLibraryService);
    repository = module.get(CommonIAttachmentLibraryRepository);
    mockRepository = module.get(CommonMockAttachmentLibraryRepository);
  });

  describe('main', () => {
    test('CommonFindAttachmentLibraryService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should find attachmentLibrary', async () => {
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
