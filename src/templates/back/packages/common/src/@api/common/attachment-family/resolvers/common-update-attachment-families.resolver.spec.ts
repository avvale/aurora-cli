/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpdateAttachmentFamiliesHandler,
  CommonUpdateAttachmentFamiliesResolver,
} from '@api/common/attachment-family';
import { CommonUpdateAttachmentFamiliesInput } from '@api/graphql';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentFamiliesResolver', () => {
  let resolver: CommonUpdateAttachmentFamiliesResolver;
  let handler: CommonUpdateAttachmentFamiliesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpdateAttachmentFamiliesResolver,
        {
          provide: CommonUpdateAttachmentFamiliesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpdateAttachmentFamiliesResolver>(
      CommonUpdateAttachmentFamiliesResolver,
    );
    handler = module.get<CommonUpdateAttachmentFamiliesHandler>(
      CommonUpdateAttachmentFamiliesHandler,
    );
  });

  test('CommonUpdateAttachmentFamiliesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpdateAttachmentFamiliesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a attachmentFamilies updated', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(
        await resolver.main(
          <CommonUpdateAttachmentFamiliesInput>(
            commonMockAttachmentFamilyData[0]
          ),
        ),
      ).toBe(commonMockAttachmentFamilyData[0]);
    });
  });
});
