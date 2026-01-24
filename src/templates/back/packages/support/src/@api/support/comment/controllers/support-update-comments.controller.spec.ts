import {
  SupportUpdateCommentsController,
  SupportUpdateCommentsHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentsController', () => {
  let controller: SupportUpdateCommentsController;
  let handler: SupportUpdateCommentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportUpdateCommentsController],
      providers: [
        {
          provide: SupportUpdateCommentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportUpdateCommentsController>(
      SupportUpdateCommentsController,
    );
    handler = module.get<SupportUpdateCommentsHandler>(
      SupportUpdateCommentsHandler,
    );
  });

  describe('main', () => {
    test('SupportUpdateCommentsController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a comments updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData[0])),
        );
      expect(await controller.main(supportMockCommentData[0])).toBe(
        supportMockCommentData[0],
      );
    });
  });
});
