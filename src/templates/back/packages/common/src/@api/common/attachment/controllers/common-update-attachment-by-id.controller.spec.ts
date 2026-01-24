import {
  CommonUpdateAttachmentByIdController,
  CommonUpdateAttachmentByIdHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentByIdController', () => {
  let controller: CommonUpdateAttachmentByIdController;
  let handler: CommonUpdateAttachmentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateAttachmentByIdController],
      providers: [
        {
          provide: CommonUpdateAttachmentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateAttachmentByIdController>(
      CommonUpdateAttachmentByIdController,
    );
    handler = module.get<CommonUpdateAttachmentByIdHandler>(
      CommonUpdateAttachmentByIdHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateAttachmentByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a attachment updated', async () => {
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
