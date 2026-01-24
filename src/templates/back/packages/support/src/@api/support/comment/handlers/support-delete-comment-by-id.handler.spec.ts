/* eslint-disable @typescript-eslint/no-unused-vars */
import { SupportDeleteCommentByIdHandler } from '@api/support/comment';
import { supportMockCommentData } from '@app/support/comment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('SupportDeleteCommentByIdController', () => {
  let handler: SupportDeleteCommentByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SupportDeleteCommentByIdHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<SupportDeleteCommentByIdHandler>(
      SupportDeleteCommentByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('SupportDeleteCommentByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an comment deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(supportMockCommentData[0])),
        );
      expect(
        await handler.main(supportMockCommentData[0].id, {}, 'Europe/Madrid'),
      ).toBe(supportMockCommentData[0]);
    });
  });
});
