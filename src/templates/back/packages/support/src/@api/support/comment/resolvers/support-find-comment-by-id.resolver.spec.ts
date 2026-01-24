/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SupportFindCommentByIdHandler,
  SupportFindCommentByIdResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportFindCommentByIdResolver', () => {
  let resolver: SupportFindCommentByIdResolver;
  let handler: SupportFindCommentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportFindCommentByIdResolver,
        {
          provide: SupportFindCommentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<SupportFindCommentByIdResolver>(
      SupportFindCommentByIdResolver,
    );
    handler = module.get<SupportFindCommentByIdHandler>(
      SupportFindCommentByIdHandler,
    );
  });

  test('SupportFindCommentByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportFindCommentByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an comment by id', async () => {
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
