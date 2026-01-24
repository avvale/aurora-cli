/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonPaginateAttachmentsHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentsHandler', () => {
  let handler: CommonPaginateAttachmentsHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAttachmentsHandler,
        {
          provide: IQueryBus,
          useValue: {
            ask: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonPaginateAttachmentsHandler>(
      CommonPaginateAttachmentsHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonPaginateAttachmentsHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAttachmentsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a attachments', async () => {
      jest.spyOn(queryBus, 'ask').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: commonMockAttachmentData.length,
              count: commonMockAttachmentData.length,
              rows: commonMockAttachmentData,
            }),
          ),
      );
      expect(await handler.main({}, {})).toEqual({
        total: commonMockAttachmentData.length,
        count: commonMockAttachmentData.length,
        rows: commonMockAttachmentData,
      });
    });
  });
});
