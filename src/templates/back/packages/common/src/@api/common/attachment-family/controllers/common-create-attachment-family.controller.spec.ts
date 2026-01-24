import {
  CommonCreateAttachmentFamilyController,
  CommonCreateAttachmentFamilyHandler,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamilyController', () => {
  let controller: CommonCreateAttachmentFamilyController;
  let handler: CommonCreateAttachmentFamilyHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonCreateAttachmentFamilyController],
      providers: [
        {
          provide: CommonCreateAttachmentFamilyHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonCreateAttachmentFamilyController>(
      CommonCreateAttachmentFamilyController,
    );
    handler = module.get<CommonCreateAttachmentFamilyHandler>(
      CommonCreateAttachmentFamilyHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentFamilyController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachmentFamily created', async () => {
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
