/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportDeleteCommentByIdHandler,
  SupportDeleteCommentByIdResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentByIdResolver', () => {
  let resolver: SupportDeleteCommentByIdResolver;
  let handler: SupportDeleteCommentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportDeleteCommentByIdResolver,
        {
          provide: SupportDeleteCommentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<SupportDeleteCommentByIdResolver>(
      SupportDeleteCommentByIdResolver,
    );
    handler = module.get<SupportDeleteCommentByIdHandler>(
      SupportDeleteCommentByIdHandler,
    );
  });

  test('SupportDeleteCommentByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportDeleteCommentByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an comment deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData[0])),
        );
      expect(await resolver.main(supportMockCommentData[0].id)).toBe(
        supportMockCommentData[0],
      );
    });
  });
});
