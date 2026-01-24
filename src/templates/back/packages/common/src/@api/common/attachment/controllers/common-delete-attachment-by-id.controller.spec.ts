/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAttachmentByIdController,
  CommonDeleteAttachmentByIdHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentByIdController', () => {
  let controller: CommonDeleteAttachmentByIdController;
  let handler: CommonDeleteAttachmentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonDeleteAttachmentByIdController],
      providers: [
        {
          provide: CommonDeleteAttachmentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonDeleteAttachmentByIdController>(
      CommonDeleteAttachmentByIdController,
    );
    handler = module.get<CommonDeleteAttachmentByIdHandler>(
      CommonDeleteAttachmentByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteAttachmentByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachment deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData[0])),
        );
      expect(await controller.main(commonMockAttachmentData[0].id)).toBe(
        commonMockAttachmentData[0],
      );
    });
  });
});
