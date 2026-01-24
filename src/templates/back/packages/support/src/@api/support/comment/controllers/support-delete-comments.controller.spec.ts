import {
  SupportDeleteCommentsController,
  SupportDeleteCommentsHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentsController', () => {
  let controller: SupportDeleteCommentsController;
  let handler: SupportDeleteCommentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportDeleteCommentsController],
      providers: [
        {
          provide: SupportDeleteCommentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportDeleteCommentsController>(
      SupportDeleteCommentsController,
    );
    handler = module.get<SupportDeleteCommentsHandler>(
      SupportDeleteCommentsHandler,
    );
  });

  describe('main', () => {
    test('SupportDeleteCommentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an supportMockCommentData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData)),
        );
      expect(await controller.main()).toBe(supportMockCommentData);
    });
  });
});
