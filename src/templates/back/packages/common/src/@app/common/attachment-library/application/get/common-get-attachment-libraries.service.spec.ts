import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonGetAttachmentLibrariesService } from '@app/common/attachment-library/application/get/common-get-attachment-libraries.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentLibrariesService', () => {
  let service: CommonGetAttachmentLibrariesService;
  let repository: CommonIAttachmentLibraryRepository;
  let mockRepository: CommonMockAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonGetAttachmentLibrariesService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonGetAttachmentLibrariesService);
    repository = module.get(CommonIAttachmentLibraryRepository);
    mockRepository = module.get(CommonMockAttachmentLibraryRepository);
  });

  describe('main', () => {
    test('GetAttachmentLibrariesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should get attachmentLibraries', async () => {
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
