import {
  CommonUpsertAttachmentLibraryController,
  CommonUpsertAttachmentLibraryHandler,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentLibraryController', () => {
  let controller: CommonUpsertAttachmentLibraryController;
  let handler: CommonUpsertAttachmentLibraryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpsertAttachmentLibraryController],
      providers: [
        {
          provide: CommonUpsertAttachmentLibraryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpsertAttachmentLibraryController>(
      CommonUpsertAttachmentLibraryController,
    );
    handler = module.get<CommonUpsertAttachmentLibraryHandler>(
      CommonUpsertAttachmentLibraryHandler,
    );
  });

  describe('main', () => {
    test('CommonUpsertAttachmentLibraryController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachmentLibrary upserted', async () => {
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
