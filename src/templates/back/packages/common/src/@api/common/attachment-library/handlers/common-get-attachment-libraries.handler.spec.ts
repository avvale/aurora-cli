/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonGetAttachmentLibrariesHandler', () => {
  let handler: CommonGetAttachmentLibrariesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonGetAttachmentLibrariesHandler,
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

    handler = module.get<CommonGetAttachmentLibrariesHandler>(
      CommonGetAttachmentLibrariesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonGetAttachmentLibrariesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonGetAttachmentLibrariesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a commonMockAttachmentLibraryData', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(commonMockAttachmentLibraryData)),
        );
      expect(await handler.main({}, {}, 'Europe/Madrid')).toBe(
        commonMockAttachmentLibraryData,
      );
    });
  });
});
