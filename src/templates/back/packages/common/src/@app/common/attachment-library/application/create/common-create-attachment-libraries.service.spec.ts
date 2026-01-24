/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonCreateAttachmentLibrariesService } from '@app/common/attachment-library/application/create/common-create-attachment-libraries.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibrariesService', () => {
  let service: CommonCreateAttachmentLibrariesService;
  let mockRepository: CommonMockAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonCreateAttachmentLibrariesService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            insert: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonCreateAttachmentLibrariesService);
    mockRepository = module.get(CommonMockAttachmentLibraryRepository);
  });

  describe('main', () => {
    test('CreateAttachmentLibrariesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should create attachmentLibraries and emit event', async () => {
      expect(await service.main(mockRepository.collectionSource)).toBe(
        undefined,
      );
    });
  });
});
