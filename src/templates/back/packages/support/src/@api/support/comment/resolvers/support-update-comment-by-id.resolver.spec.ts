/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportUpdateCommentByIdInput } from '@api/graphql';
import {
  SupportUpdateCommentByIdHandler,
  SupportUpdateCommentByIdResolver,
} from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportUpdateCommentByIdResolver', () => {
  let resolver: SupportUpdateCommentByIdResolver;
  let handler: SupportUpdateCommentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportUpdateCommentByIdResolver,
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

    resolver = module.get<SupportUpdateCommentByIdResolver>(
      SupportUpdateCommentByIdResolver,
    );
    handler = module.get<SupportUpdateCommentByIdHandler>(
      SupportUpdateCommentByIdHandler,
    );
  });

  test('SupportUpdateCommentByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('SupportUpdateCommentByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a comment by id updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData[0])),
        );
      expect(
        await resolver.main(
          <SupportUpdateCommentByIdInput>supportMockCommentData[0],
        ),
      ).toBe(supportMockCommentData[0]);
    });
  });
});
