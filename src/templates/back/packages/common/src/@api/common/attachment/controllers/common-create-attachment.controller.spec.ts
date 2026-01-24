import {
  CommonCreateAttachmentController,
  CommonCreateAttachmentHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentController', () => {
  let controller: CommonCreateAttachmentController;
  let handler: CommonCreateAttachmentHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonCreateAttachmentController],
      providers: [
        {
          provide: CommonCreateAttachmentHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonCreateAttachmentController>(
      CommonCreateAttachmentController,
    );
    handler = module.get<CommonCreateAttachmentHandler>(
      CommonCreateAttachmentHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an attachment created', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData[0])),
        );
      expect(await controller.main(commonMockAttachmentData[0])).toBe(
        commonMockAttachmentData[0],
      );
    });
  });
});
