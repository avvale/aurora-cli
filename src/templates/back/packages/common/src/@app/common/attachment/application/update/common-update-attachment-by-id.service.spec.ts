/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonIAttachmentRepository,
  commonMockAttachmentData,
  CommonMockAttachmentRepository,
} from '@app/common/attachment';
import { CommonUpdateAttachmentByIdService } from '@app/common/attachment/application/update/common-update-attachment-by-id.service';
import {
  CommonAttachmentAlt,
  CommonAttachmentAttachableId,
  CommonAttachmentExtension,
  CommonAttachmentFamilyId,
  CommonAttachmentFilename,
  CommonAttachmentHeight,
  CommonAttachmentId,
  CommonAttachmentIsCropable,
  CommonAttachmentLangId,
  CommonAttachmentLibraryFilename,
  CommonAttachmentLibraryId,
  CommonAttachmentMeta,
  CommonAttachmentMimetype,
  CommonAttachmentOriginFilename,
  CommonAttachmentRelativePathSegments,
  CommonAttachmentSize,
  CommonAttachmentSizes,
  CommonAttachmentSort,
  CommonAttachmentTitle,
  CommonAttachmentUrl,
  CommonAttachmentWidth,
} from '@app/common/attachment/domain/value-objects';
import {
  CommandBus,
  EventBus,
  EventPublisher,
  UnhandledExceptionBus,
} from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentByIdService', () => {
  let service: CommonUpdateAttachmentByIdService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandBus,
        EventBus,
        EventPublisher,
        UnhandledExceptionBus,
        CommonUpdateAttachmentByIdService,
        CommonMockAttachmentRepository,
        {
          provide: CommonIAttachmentRepository,
          useValue: {
            updateById: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    service = module.get(CommonUpdateAttachmentByIdService);
  });

  describe('main', () => {
    test('CommonUpdateAttachmentByIdService should be defined', () => {
      expect(service).toBeDefined();
    });

    test('should update a attachment and emit event', async () => {
      expect(
        await service.main(
          {
            id: new CommonAttachmentId(commonMockAttachmentData[0].id),
            familyId: new CommonAttachmentFamilyId(
              commonMockAttachmentData[0].familyId,
            ),
            attachableId: new CommonAttachmentAttachableId(
              commonMockAttachmentData[0].attachableId,
            ),
            langId: new CommonAttachmentLangId(
              commonMockAttachmentData[0].langId,
            ),
            sort: new CommonAttachmentSort(commonMockAttachmentData[0].sort),
            alt: new CommonAttachmentAlt(commonMockAttachmentData[0].alt),
            title: new CommonAttachmentTitle(commonMockAttachmentData[0].title),
            originFilename: new CommonAttachmentOriginFilename(
              commonMockAttachmentData[0].originFilename,
            ),
            filename: new CommonAttachmentFilename(
              commonMockAttachmentData[0].filename,
            ),
            mimetype: new CommonAttachmentMimetype(
              commonMockAttachmentData[0].mimetype,
            ),
            extension: new CommonAttachmentExtension(
              commonMockAttachmentData[0].extension,
            ),
            relativePathSegments: new CommonAttachmentRelativePathSegments(
              commonMockAttachmentData[0].relativePathSegments,
            ),
            width: new CommonAttachmentWidth(commonMockAttachmentData[0].width),
            height: new CommonAttachmentHeight(
              commonMockAttachmentData[0].height,
            ),
            size: new CommonAttachmentSize(commonMockAttachmentData[0].size),
            url: new CommonAttachmentUrl(commonMockAttachmentData[0].url),
            isCropable: new CommonAttachmentIsCropable(
              commonMockAttachmentData[0].isCropable,
            ),
            libraryId: new CommonAttachmentLibraryId(
              commonMockAttachmentData[0].libraryId,
            ),
            libraryFilename: new CommonAttachmentLibraryFilename(
              commonMockAttachmentData[0].libraryFilename,
            ),
            sizes: new CommonAttachmentSizes(commonMockAttachmentData[0].sizes),
            meta: new CommonAttachmentMeta(commonMockAttachmentData[0].meta),
          },
          {},
        ),
      ).toBe(undefined);
    });
  });
});
