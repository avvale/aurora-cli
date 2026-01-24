import {
  CommonCreateAttachmentLibrariesHandler,
  CommonCreateAttachmentLibrariesResolver,
} from '@api/common/attachment-library';
import { CommonCreateAttachmentLibraryInput } from '@api/graphql';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentLibrariesResolver', () => {
  let resolver: CommonCreateAttachmentLibrariesResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAttachmentLibrariesResolver,
        {
          provide: CommonCreateAttachmentLibrariesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAttachmentLibrariesResolver>(
      CommonCreateAttachmentLibrariesResolver,
    );
  });

  test('CommonCreateAttachmentLibrariesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAttachmentLibrariesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachmentLibraries created', async () => {
      expect(
        await resolver.main(
          <CommonCreateAttachmentLibraryInput[]>commonMockAttachmentLibraryData,
        ),
      ).toBe(undefined);
    });
  });
});
