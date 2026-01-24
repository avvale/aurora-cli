/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonPaginateAttachmentLibrariesHandler,
  CommonPaginateAttachmentLibrariesResolver,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentLibrariesResolver', () => {
  let resolver: CommonPaginateAttachmentLibrariesResolver;
  let handler: CommonPaginateAttachmentLibrariesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAttachmentLibrariesResolver,
        {
          provide: CommonPaginateAttachmentLibrariesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonPaginateAttachmentLibrariesResolver>(
      CommonPaginateAttachmentLibrariesResolver,
    );
    handler = module.get<CommonPaginateAttachmentLibrariesHandler>(
      CommonPaginateAttachmentLibrariesHandler,
    );
  });

  test('CommonPaginateAttachmentLibrariesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAttachmentLibrariesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockAttachmentLibraryData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockAttachmentLibraryData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockAttachmentLibraryData,
      });
    });
  });
});
