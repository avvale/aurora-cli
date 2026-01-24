/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAttachmentLibraryHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibraryHandler', () => {
  let handler: CommonCreateAttachmentLibraryHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAttachmentLibraryHandler,
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

    handler = module.get<CommonCreateAttachmentLibraryHandler>(
      CommonCreateAttachmentLibraryHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonCreateAttachmentLibraryHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an attachmentLibrary created', async () => {
      jest
        .spyOn(queryBus, 'ask')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentLibraryData[0]),
            ),
        );
      expect(
        await handler.main(commonMockAttachmentLibraryData[0], 'Europe/Madrid'),
      ).toBe(commonMockAttachmentLibraryData[0]);
    });
  });
});
