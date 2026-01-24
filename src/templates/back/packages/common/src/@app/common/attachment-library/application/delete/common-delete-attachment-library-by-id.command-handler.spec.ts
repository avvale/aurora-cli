import {
  CommonDeleteAttachmentLibraryByIdCommand,
  commonMockAttachmentLibraryData,
} from '@app/common/attachment-library';
import { CommonDeleteAttachmentLibraryByIdCommandHandler } from '@app/common/attachment-library/application/delete/common-delete-attachment-library-by-id.command-handler';
import { CommonDeleteAttachmentLibraryByIdService } from '@app/common/attachment-library/application/delete/common-delete-attachment-library-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibraryByIdCommandHandler', () => {
  let commandHandler: CommonDeleteAttachmentLibraryByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteAttachmentLibraryByIdCommandHandler,
        {
          provide: CommonDeleteAttachmentLibraryByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler =
      module.get<CommonDeleteAttachmentLibraryByIdCommandHandler>(
        CommonDeleteAttachmentLibraryByIdCommandHandler,
      );
  });

  describe('main', () => {
    test('CommonDeleteAttachmentLibraryByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the CommonDeleteAttachmentLibraryByIdService', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteAttachmentLibraryByIdCommand(
            commonMockAttachmentLibraryData[0].id,
          ),
        ),
      ).toBe(undefined);
    });
  });
});
