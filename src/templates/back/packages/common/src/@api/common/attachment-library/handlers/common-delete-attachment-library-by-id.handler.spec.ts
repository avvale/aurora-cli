/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDeleteAttachmentLibraryByIdHandler } from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibraryByIdController', () => {
  let handler: CommonDeleteAttachmentLibraryByIdHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAttachmentLibraryByIdHandler,
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

    handler = module.get<CommonDeleteAttachmentLibraryByIdHandler>(
      CommonDeleteAttachmentLibraryByIdHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  describe('main', () => {
    test('CommonDeleteAttachmentLibraryByIdHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an attachmentLibrary deleted', async () => {
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
