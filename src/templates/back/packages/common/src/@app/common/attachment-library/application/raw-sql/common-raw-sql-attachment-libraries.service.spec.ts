import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonRawSQLAttachmentLibrariesService } from '@app/common/attachment-library/application/raw-sql/common-raw-sql-attachment-libraries.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonRawSQLAttachmentLibrariesService ', () => {
  let service: CommonRawSQLAttachmentLibrariesService;
  let repository: CommonIAttachmentLibraryRepository;
  let mockRepository: CommonMockAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonRawSQLAttachmentLibrariesService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            rawSQL: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonRawSQLAttachmentLibrariesService);
    repository = module.get(CommonIAttachmentLibraryRepository);
    mockRepository = module.get(CommonMockAttachmentLibraryRepository);
  });

  describe('main', () => {
    test('RawSQLAttachmentLibrariesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get attachmentLibraries', async () => {
      jest
        .spyOn(repository, 'rawSQL')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(mockRepository.collectionSource)),
        );
      expect(await service.main()).toBe(mockRepository.collectionSource);
    });
  });
});
