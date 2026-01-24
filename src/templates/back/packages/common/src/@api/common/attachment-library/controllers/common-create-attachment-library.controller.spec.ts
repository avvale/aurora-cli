import {
  CommonCreateAttachmentLibraryController,
  CommonCreateAttachmentLibraryHandler,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibraryController', () => {
  let controller: CommonCreateAttachmentLibraryController;
  let handler: CommonCreateAttachmentLibraryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonCreateAttachmentLibraryController],
      providers: [
        {
          provide: CommonCreateAttachmentLibraryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonCreateAttachmentLibraryController>(
      CommonCreateAttachmentLibraryController,
    );
    handler = module.get<CommonCreateAttachmentLibraryHandler>(
      CommonCreateAttachmentLibraryHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentLibraryController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachmentLibrary created', async () => {
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
