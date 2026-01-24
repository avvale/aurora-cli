/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAttachmentFamilyByIdController,
  CommonDeleteAttachmentFamilyByIdHandler,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamilyByIdController', () => {
  let controller: CommonDeleteAttachmentFamilyByIdController;
  let handler: CommonDeleteAttachmentFamilyByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonDeleteAttachmentFamilyByIdController],
      providers: [
        {
          provide: CommonDeleteAttachmentFamilyByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonDeleteAttachmentFamilyByIdController>(
      CommonDeleteAttachmentFamilyByIdController,
    );
    handler = module.get<CommonDeleteAttachmentFamilyByIdHandler>(
      CommonDeleteAttachmentFamilyByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteAttachmentFamilyByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachmentFamily deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(await controller.main(commonMockAttachmentFamilyData[0].id)).toBe(
        commonMockAttachmentFamilyData[0],
      );
    });
  });
});
