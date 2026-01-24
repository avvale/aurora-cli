/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAttachmentLibraryRepository,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonDeleteAttachmentLibrariesService } from '@app/common/attachment-library/application/delete/common-delete-attachment-libraries.service';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibrariesService', () => {
  let service: CommonDeleteAttachmentLibrariesService;
  let repository: CommonIAttachmentLibraryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonDeleteAttachmentLibrariesService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            get: () => {
              /**/
            },
            delete: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonDeleteAttachmentLibrariesService);
    repository = module.get(CommonIAttachmentLibraryRepository);
  });

  describe('main', () => {
    test('CommonDeleteAttachmentLibrariesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should delete attachmentLibrary and emit event', async () => {
      jest
        .spyOn(repository, 'get')
        .mockImplementation(() => new Promise((resolve) => resolve([])));
      expect(await service.main({}, {})).toBe(undefined);
    });
  });
});
