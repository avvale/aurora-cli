import {
  commonMockAttachmentLibraryData,
  CommonUpdateAttachmentLibraryByIdCommand,
} from '@app/common/attachment-library';
import { CommonUpdateAttachmentLibraryByIdCommandHandler } from '@app/common/attachment-library/application/update/common-update-attachment-library-by-id.command-handler';
import { CommonUpdateAttachmentLibraryByIdService } from '@app/common/attachment-library/application/update/common-update-attachment-library-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibraryByIdCommandHandler', () => {
  let commandHandler: CommonUpdateAttachmentLibraryByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpdateAttachmentLibraryByIdCommandHandler,
        {
          provide: CommonUpdateAttachmentLibraryByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonUpdateAttachmentLibraryByIdCommandHandler>(
        CommonUpdateAttachmentLibraryByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('UpdateAttachmentLibraryByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an attachmentLibrary created', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpdateAttachmentLibraryByIdCommand(
            {
              id: commonMockAttachmentLibraryData[0].id,
              originFilename: commonMockAttachmentLibraryData[0].originFilename,
              filename: commonMockAttachmentLibraryData[0].filename,
              mimetype: commonMockAttachmentLibraryData[0].mimetype,
              extension: commonMockAttachmentLibraryData[0].extension,
              relativePathSegments:
                commonMockAttachmentLibraryData[0].relativePathSegments,
              width: commonMockAttachmentLibraryData[0].width,
              height: commonMockAttachmentLibraryData[0].height,
              size: commonMockAttachmentLibraryData[0].size,
              url: commonMockAttachmentLibraryData[0].url,
              meta: commonMockAttachmentLibraryData[0].meta,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
