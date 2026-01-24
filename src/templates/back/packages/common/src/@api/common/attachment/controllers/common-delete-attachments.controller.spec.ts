import {
  CommonDeleteAttachmentsController,
  CommonDeleteAttachmentsHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentsController', () => {
  let controller: CommonDeleteAttachmentsController;
  let handler: CommonDeleteAttachmentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonDeleteAttachmentsController],
      providers: [
        {
          provide: CommonDeleteAttachmentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonDeleteAttachmentsController>(
      CommonDeleteAttachmentsController,
    );
    handler = module.get<CommonDeleteAttachmentsHandler>(
      CommonDeleteAttachmentsHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteAttachmentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an commonMockAttachmentData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData)),
        );
      expect(await controller.main()).toBe(commonMockAttachmentData);
    });
  });
});
