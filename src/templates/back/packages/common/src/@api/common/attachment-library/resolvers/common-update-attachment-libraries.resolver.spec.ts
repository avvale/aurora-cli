/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpdateAttachmentLibrariesHandler,
  CommonUpdateAttachmentLibrariesResolver,
} from '@api/common/attachment-library';
import { CommonUpdateAttachmentLibrariesInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentLibrariesResolver', () => {
  let resolver: CommonUpdateAttachmentLibrariesResolver;
  let handler: CommonUpdateAttachmentLibrariesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAttachmentLibrariesResolver,
        {
          provide: CommonUpdateAttachmentLibrariesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateAttachmentLibrariesResolver>(
      CommonUpdateAttachmentLibrariesResolver,
    );
    handler = module.get<CommonUpdateAttachmentLibrariesHandler>(
      CommonUpdateAttachmentLibrariesHandler,
    );
  });

  test('CommonUpdateAttachmentLibrariesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAttachmentLibrariesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a attachmentLibraries updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentLibraryData[0]),
            ),
        );
      expect(
        await resolver.main(
          <CommonUpdateAttachmentLibrariesInput>(
            commonMockAttachmentLibraryData[0]
          ),
        ),
      ).toBe(commonMockAttachmentLibraryData[0]);
    });
  });
});
