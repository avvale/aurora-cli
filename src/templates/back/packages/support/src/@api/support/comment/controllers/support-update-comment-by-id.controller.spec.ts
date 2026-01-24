import {
  SupportUpdateCommentByIdController,
  SupportUpdateCommentByIdHandler,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentByIdController', () => {
  let controller: SupportUpdateCommentByIdController;
  let handler: SupportUpdateCommentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SupportUpdateCommentByIdController],
      providers: [
        {
          provide: SupportUpdateCommentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    controller = module.get<SupportUpdateCommentByIdController>(
      SupportUpdateCommentByIdController,
    );
    handler = module.get<SupportUpdateCommentByIdHandler>(
      SupportUpdateCommentByIdHandler,
    );
  });

  describe('main', () => {
    test('SupportUpdateCommentByIdController should be defined', () => {
      expect(controller).toBeDefined();
    });

    test('should return a comment updated', async () => {
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
