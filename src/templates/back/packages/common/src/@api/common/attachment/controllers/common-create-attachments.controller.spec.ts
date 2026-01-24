import {
  CommonCreateAttachmentsController,
  CommonCreateAttachmentsHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentsController', () => {
  let controller: CommonCreateAttachmentsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonCreateAttachmentsController],
      providers: [
        {
          provide: CommonCreateAttachmentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonCreateAttachmentsController>(
      CommonCreateAttachmentsController,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an commonMockAttachmentData created', async () => {
      expect(await controller.main(commonMockAttachmentData)).toBe(undefined);
    });
  });
});
