import {
  CommonFindAttachmentLibraryController,
  CommonFindAttachmentLibraryHandler,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryController', () => {
  let controller: CommonFindAttachmentLibraryController;
  let handler: CommonFindAttachmentLibraryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAttachmentLibraryController],
      providers: [
        {
          provide: CommonFindAttachmentLibraryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAttachmentLibraryController>(
      CommonFindAttachmentLibraryController,
    );
    handler = module.get<CommonFindAttachmentLibraryHandler>(
      CommonFindAttachmentLibraryHandler,
    );
  });

  describe('main', () => {
    test('CommonFindAttachmentLibraryController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a attachmentLibrary', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentLibraryData[0]),
            ),
        );
      expect(await controller.main()).toBe(commonMockAttachmentLibraryData[0]);
    });
  });
});
