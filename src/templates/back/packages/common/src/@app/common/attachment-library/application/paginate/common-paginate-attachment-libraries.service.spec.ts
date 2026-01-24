import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonPaginateAttachmentLibrariesService } from '@app/common/attachment-library/application/paginate/common-paginate-attachment-libraries.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentLibrariesService', () => {
  let service: CommonPaginateAttachmentLibrariesService;
  let repository: CommonIAttachmentLibraryRepository;
  let mockRepository: CommonMockAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonPaginateAttachmentLibrariesService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            paginate: (queryStatement, constraints) => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonPaginateAttachmentLibrariesService);
    repository = module.get(CommonIAttachmentLibraryRepository);
    mockRepository = module.get(CommonMockAttachmentLibraryRepository);
  });

  describe('main', () => {
    test('CommonPaginateAttachmentLibrariesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should paginate attachmentLibraries', async () => {
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
