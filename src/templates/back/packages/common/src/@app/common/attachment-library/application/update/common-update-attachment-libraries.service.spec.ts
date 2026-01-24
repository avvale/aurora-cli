/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAttachmentLibraryRepository,
  commonMockAttachmentLibraryData,
  CommonMockAttachmentLibraryRepository,
} from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibrariesService } from '@app/common/attachment-library/application/update/common-update-attachment-libraries.service';
import {
  CommonAttachmentLibraryExtension,
  CommonAttachmentLibraryFilename,
  CommonAttachmentLibraryHeight,
  CommonAttachmentLibraryId,
  CommonAttachmentLibraryMeta,
  CommonAttachmentLibraryMimetype,
  CommonAttachmentLibraryOriginFilename,
  CommonAttachmentLibraryRelativePathSegments,
  CommonAttachmentLibrarySize,
  CommonAttachmentLibraryUrl,
  CommonAttachmentLibraryWidth,
} from '@app/common/attachment-library/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibrariesService', () => {
  let service: CommonUpdateAttachmentLibrariesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonUpdateAttachmentLibrariesService,
        CommonMockAttachmentLibraryRepository,
        {
          provide: CommonIAttachmentLibraryRepository,
          useValue: {
            update: () => {
              /**/
            },
            get: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonUpdateAttachmentLibrariesService);
  });

  describe('main', () => {
    test('UpdateAttachmentLibrariesService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a attachmentLibraries and emit event', async () => {
      expect(
        await service.main(
          {
            id: new CommonAttachmentLibraryId(
              commonMockAttachmentLibraryData[0].id,
            ),
            originFilename: new CommonAttachmentLibraryOriginFilename(
              commonMockAttachmentLibraryData[0].originFilename,
            ),
            filename: new CommonAttachmentLibraryFilename(
              commonMockAttachmentLibraryData[0].filename,
            ),
            mimetype: new CommonAttachmentLibraryMimetype(
              commonMockAttachmentLibraryData[0].mimetype,
            ),
            extension: new CommonAttachmentLibraryExtension(
              commonMockAttachmentLibraryData[0].extension,
            ),
            relativePathSegments:
              new CommonAttachmentLibraryRelativePathSegments(
                commonMockAttachmentLibraryData[0].relativePathSegments,
              ),
            width: new CommonAttachmentLibraryWidth(
              commonMockAttachmentLibraryData[0].width,
            ),
            height: new CommonAttachmentLibraryHeight(
              commonMockAttachmentLibraryData[0].height,
            ),
            size: new CommonAttachmentLibrarySize(
              commonMockAttachmentLibraryData[0].size,
            ),
            url: new CommonAttachmentLibraryUrl(
              commonMockAttachmentLibraryData[0].url,
            ),
            meta: new CommonAttachmentLibraryMeta(
              commonMockAttachmentLibraryData[0].meta,
            ),
          },
          {},
          {},
        ),
      ).toBe(undefined);
    });
  });
});
