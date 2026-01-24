/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentByIdHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentByIdHandler', () => {
  let handler: CommonFindAttachmentByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAttachmentByIdHandler,
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

    handler = module.get<CommonFindAttachmentByIdHandler>(
      CommonFindAttachmentByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAttachmentByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAttachmentByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an attachment by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData[0])),
        );
      expect(
        await handler.main(commonMockAttachmentData[0].id, {}, 'Europe/Madrid'),
      ).toBe(commonMockAttachmentData[0]);
    });
  });
});
