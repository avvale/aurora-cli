import {
  CommonGetAttachmentLibrariesController,
  CommonGetAttachmentLibrariesHandler,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentLibrariesController', () => {
  let controller: CommonGetAttachmentLibrariesController;
  let handler: CommonGetAttachmentLibrariesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonGetAttachmentLibrariesController],
      providers: [
        {
          provide: CommonGetAttachmentLibrariesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonGetAttachmentLibrariesController>(
      CommonGetAttachmentLibrariesController,
    );
    handler = module.get<CommonGetAttachmentLibrariesHandler>(
      CommonGetAttachmentLibrariesHandler,
    );
  });

  describe('main', () => {
    test('CommonGetAttachmentLibrariesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockAttachmentLibraryData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(commonMockAttachmentLibraryData)),
        );
      expect(await controller.main()).toBe(commonMockAttachmentLibraryData);
    });
  });
});
