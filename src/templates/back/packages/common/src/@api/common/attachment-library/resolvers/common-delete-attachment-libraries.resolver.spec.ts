/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAttachmentLibrariesHandler,
  CommonDeleteAttachmentLibrariesResolver,
} from '@api/common/attachment-library';
import { commonMockAttachmentLibraryData } from '@app/common/attachment-library';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentLibrariesResolver', () => {
  let resolver: CommonDeleteAttachmentLibrariesResolver;
  let handler: CommonDeleteAttachmentLibrariesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAttachmentLibrariesResolver,
        {
          provide: CommonDeleteAttachmentLibrariesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAttachmentLibrariesResolver>(
      CommonDeleteAttachmentLibrariesResolver,
    );
    handler = module.get<CommonDeleteAttachmentLibrariesHandler>(
      CommonDeleteAttachmentLibrariesHandler,
    );
  });

  test('CommonDeleteAttachmentLibrariesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAttachmentLibrariesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an commonMockAttachmentLibraryData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(commonMockAttachmentLibraryData)),
        );
      expect(await resolver.main()).toBe(commonMockAttachmentLibraryData);
    });
  });
});
