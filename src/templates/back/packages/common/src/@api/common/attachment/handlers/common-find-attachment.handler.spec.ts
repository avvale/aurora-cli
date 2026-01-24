/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentHandler', () => {
  let handler: CommonFindAttachmentHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAttachmentHandler,
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

    handler = module.get<CommonFindAttachmentHandler>(
      CommonFindAttachmentHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAttachmentHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAttachmentHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a attachment', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData[0])),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAttachmentData[0],
      );
    });
  });
});
