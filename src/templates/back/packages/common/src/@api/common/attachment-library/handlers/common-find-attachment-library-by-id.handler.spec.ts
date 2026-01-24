/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonFindAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentLibraryByIdHandler', () => {
  let handler: CommonFindAttachmentLibraryByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAttachmentLibraryByIdHandler,
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

    handler = module.get<CommonFindAttachmentLibraryByIdHandler>(
      CommonFindAttachmentLibraryByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonFindAttachmentLibraryByIdHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAttachmentLibraryByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an attachmentLibrary by id', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentLibraryData[0]),
            ),
        );
      expect(
        await handler.main(
          commonMockAttachmentLibraryData[0].id,
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAttachmentLibraryData[0]);
    });
  });
});
