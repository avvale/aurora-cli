import {
  SupportGetCommentsController,
  SupportGetCommentsHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportGetCommentsController', () => {
  let controller: SupportGetCommentsController;
  let handler: SupportGetCommentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportGetCommentsController],
      providers: [
        {
          provide: SupportGetCommentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportGetCommentsController>(
      SupportGetCommentsController,
    );
    handler = module.get<SupportGetCommentsHandler>(SupportGetCommentsHandler);
  });

  describe('main', () => {
    test('SupportGetCommentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a supportMockCommentData', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData)),
        );
      expect(await controller.main()).toBe(supportMockCommentData);
    });
  });
});
