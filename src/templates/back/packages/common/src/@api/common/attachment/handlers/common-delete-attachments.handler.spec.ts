/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentsHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentsHandler', () => {
  let handler: CommonDeleteAttachmentsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAttachmentsHandler,
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

    handler = module.get<CommonDeleteAttachmentsHandler>(
      CommonDeleteAttachmentsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonDeleteAttachmentsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAttachmentsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockAttachmentData deleted', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAttachmentData,
      );
    });
  });
});
