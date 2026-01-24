import {
  SupportPaginateCommentsController,
  SupportPaginateCommentsHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportPaginateCommentsController', () => {
  let controller: SupportPaginateCommentsController;
  let handler: SupportPaginateCommentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportPaginateCommentsController],
      providers: [
        {
          provide: SupportPaginateCommentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportPaginateCommentsController>(
      SupportPaginateCommentsController,
    );
    handler = module.get<SupportPaginateCommentsHandler>(
      SupportPaginateCommentsHandler,
    );
  });

  describe('main', () => {
    test('SupportPaginateCommentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a supportMockCommentData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: supportMockCommentData,
            }),
          ),
      );
      expect(await controller.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: supportMockCommentData,
      });
    });
  });
});
