import { CommonCreateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibrariesHandler', () => {
  let handler: CommonCreateAttachmentLibrariesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAttachmentLibrariesHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonCreateAttachmentLibrariesHandler>(
      CommonCreateAttachmentLibrariesHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentLibrariesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockAttachmentLibraryData created', async () => {
      expect(await handler.main(commonMockAttachmentLibraryData)).toBe(true);
    });
  });
});
