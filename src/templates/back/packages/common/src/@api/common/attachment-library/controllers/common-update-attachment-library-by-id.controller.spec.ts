import {
  CommonUpdateAttachmentLibraryByIdController,
  CommonUpdateAttachmentLibraryByIdHandler,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibraryByIdController', () => {
  let controller: CommonUpdateAttachmentLibraryByIdController;
  let handler: CommonUpdateAttachmentLibraryByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateAttachmentLibraryByIdController],
      providers: [
        {
          provide: CommonUpdateAttachmentLibraryByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateAttachmentLibraryByIdController>(
      CommonUpdateAttachmentLibraryByIdController,
    );
    handler = module.get<CommonUpdateAttachmentLibraryByIdHandler>(
      CommonUpdateAttachmentLibraryByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateAttachmentLibraryByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a attachmentLibrary updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentLibraryData[0]),
            ),
        );
      expect(await controller.main(commonMockAttachmentLibraryData[0])).toBe(
        commonMockAttachmentLibraryData[0],
      );
    });
  });
});
