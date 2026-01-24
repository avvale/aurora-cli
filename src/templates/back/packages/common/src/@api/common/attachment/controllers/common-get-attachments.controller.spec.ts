import {
  CommonGetAttachmentsController,
  CommonGetAttachmentsHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentsController', () => {
  let controller: CommonGetAttachmentsController;
  let handler: CommonGetAttachmentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonGetAttachmentsController],
      providers: [
        {
          provide: CommonGetAttachmentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonGetAttachmentsController>(
      CommonGetAttachmentsController,
    );
    handler = module.get<CommonGetAttachmentsHandler>(
      CommonGetAttachmentsHandler,
    );
  });

  describe('main', () => {
    test('CommonGetAttachmentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockAttachmentData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData)),
        );
      expect(await controller.main()).toBe(commonMockAttachmentData);
    });
  });
});
