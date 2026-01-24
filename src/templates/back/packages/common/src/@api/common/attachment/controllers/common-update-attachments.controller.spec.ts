import {
  CommonUpdateAttachmentsController,
  CommonUpdateAttachmentsHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentsController', () => {
  let controller: CommonUpdateAttachmentsController;
  let handler: CommonUpdateAttachmentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonUpdateAttachmentsController],
      providers: [
        {
          provide: CommonUpdateAttachmentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonUpdateAttachmentsController>(
      CommonUpdateAttachmentsController,
    );
    handler = module.get<CommonUpdateAttachmentsHandler>(
      CommonUpdateAttachmentsHandler,
    );
  });

  describe('main', () => {
    test('CommonUpdateAttachmentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a attachments updated', async () => {
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
