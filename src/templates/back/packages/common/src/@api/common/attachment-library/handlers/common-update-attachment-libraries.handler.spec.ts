/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAttachmentLibrariesHandler } from '@api/common/attachment-library';
import { CommonUpdateAttachmentLibrariesInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibrariesHandler', () => {
  let handler: CommonUpdateAttachmentLibrariesHandler;
  let queryBus: IQueryBus;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAttachmentLibrariesHandler,
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

    handler = module.get<CommonUpdateAttachmentLibrariesHandler>(
      CommonUpdateAttachmentLibrariesHandler,
    );
    queryBus = module.get<IQueryBus>(IQueryBus);
  });

  test('CommonUpdateAttachmentLibrariesHandler should be defined', () => {
    expect(handler).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAttachmentLibrariesHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return a attachmentLibraries updated', async () => {
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
          <CommonUpdateAttachmentLibrariesInput>(
            commonMockAttachmentLibraryData[0]
          ),
          {},
          {},
          'Europe/Madrid',
        ),
      ).toBe(commonMockAttachmentLibraryData[0]);
    });
  });
});
