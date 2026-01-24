import {
  SupportCreateCommentController,
  SupportCreateCommentHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportCreateCommentController', () => {
  let controller: SupportCreateCommentController;
  let handler: SupportCreateCommentHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportCreateCommentController],
      providers: [
        {
          provide: SupportCreateCommentHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportCreateCommentController>(
      SupportCreateCommentController,
    );
    handler = module.get<SupportCreateCommentHandler>(
      SupportCreateCommentHandler,
    );
  });

  describe('main', () => {
    test('SupportCreateCommentController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return an comment created', async () => {
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
