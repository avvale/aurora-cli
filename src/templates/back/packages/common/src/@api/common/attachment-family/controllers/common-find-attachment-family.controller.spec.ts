import {
  CommonFindAttachmentFamilyController,
  CommonFindAttachmentFamilyHandler,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentFamilyController', () => {
  let controller: CommonFindAttachmentFamilyController;
  let handler: CommonFindAttachmentFamilyHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonFindAttachmentFamilyController],
      providers: [
        {
          provide: CommonFindAttachmentFamilyHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonFindAttachmentFamilyController>(
      CommonFindAttachmentFamilyController,
    );
    handler = module.get<CommonFindAttachmentFamilyHandler>(
      CommonFindAttachmentFamilyHandler,
    );
  });

  describe('main', () => {
    test('CommonFindAttachmentFamilyController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a attachmentFamily', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(await controller.main()).toBe(commonMockAttachmentFamilyData[0]);
    });
  });
});
