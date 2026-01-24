import {
  CommonPaginateAttachmentsController,
  CommonPaginateAttachmentsHandler,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentsController', () => {
  let controller: CommonPaginateAttachmentsController;
  let handler: CommonPaginateAttachmentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CommonPaginateAttachmentsController],
      providers: [
        {
          provide: CommonPaginateAttachmentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<CommonPaginateAttachmentsController>(
      CommonPaginateAttachmentsController,
    );
    handler = module.get<CommonPaginateAttachmentsHandler>(
      CommonPaginateAttachmentsHandler,
    );
  });

  describe('main', () => {
    test('CommonPaginateAttachmentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a commonMockAttachmentData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockAttachmentData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockAttachmentData,
      });
    });
  });
});
