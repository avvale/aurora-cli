/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonCreateAttachmentLibraryHandler,
  CommonCreateAttachmentLibraryResolver,
} from '@api/common/attachment-library';
import { CommonCreateAttachmentLibraryInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibraryResolver', () => {
  let resolver: CommonCreateAttachmentLibraryResolver;
  let handler: CommonCreateAttachmentLibraryHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAttachmentLibraryResolver,
        {
          provide: CommonCreateAttachmentLibraryHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAttachmentLibraryResolver>(
      CommonCreateAttachmentLibraryResolver,
    );
    handler = module.get<CommonCreateAttachmentLibraryHandler>(
      CommonCreateAttachmentLibraryHandler,
    );
  });

  test('CommonCreateAttachmentLibraryResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAttachmentLibraryResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachmentLibrary created', async () => {
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
          <CommonCreateAttachmentLibraryInput>(
            commonMockAttachmentLibraryData[0]
          ),
        ),
      ).toBe(commonMockAttachmentLibraryData[0]);
    });
  });
});
