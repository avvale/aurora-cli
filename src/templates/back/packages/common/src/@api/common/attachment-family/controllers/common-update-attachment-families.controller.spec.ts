import {
  CommonUpdateAttachmentFamiliesController,
  CommonUpdateAttachmentFamiliesHandler,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentFamiliesController', () => {
  let controller: CommonUpdateAttachmentFamiliesController;
  let handler: CommonUpdateAttachmentFamiliesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateAttachmentFamiliesController],
      providers: [
        {
          provide: CommonUpdateAttachmentFamiliesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateAttachmentFamiliesController>(
      CommonUpdateAttachmentFamiliesController,
    );
    handler = module.get<CommonUpdateAttachmentFamiliesHandler>(
      CommonUpdateAttachmentFamiliesHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateAttachmentFamiliesController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a attachmentFamilies updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(await controller.main(commonMockAttachmentFamilyData[0])).toBe(
        commonMockAttachmentFamilyData[0],
      );
    });
  });
});
