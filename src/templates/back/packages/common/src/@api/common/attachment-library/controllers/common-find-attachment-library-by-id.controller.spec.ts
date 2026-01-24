import {
  CommonFindAttachmentLibraryByIdController,
  CommonFindAttachmentLibraryByIdHandler,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryByIdController', () => {
  let controller: CommonFindAttachmentLibraryByIdController;
  let handler: CommonFindAttachmentLibraryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAttachmentLibraryByIdController],
      providers: [
        {
          provide: CommonFindAttachmentLibraryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAttachmentLibraryByIdController>(
      CommonFindAttachmentLibraryByIdController,
    );
    handler = module.get<CommonFindAttachmentLibraryByIdHandler>(
      CommonFindAttachmentLibraryByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonFindAttachmentLibraryByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachmentLibrary by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentLibraryData[0]),
            ),
        );
      expect(await controller.main(commonMockAttachmentLibraryData[0].id)).toBe(
        commonMockAttachmentLibraryData[0],
      );
    });
  });
});
