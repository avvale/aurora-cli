/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonCreateAttachmentFamilyHandler,
  CommonCreateAttachmentFamilyResolver,
} from '@api/common/attachment-family';
import { CommonCreateAttachmentFamilyInput } from '@api/graphql';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentFamilyResolver', () => {
  let resolver: CommonCreateAttachmentFamilyResolver;
  let handler: CommonCreateAttachmentFamilyHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCreateAttachmentFamilyResolver,
        {
          provide: CommonCreateAttachmentFamilyHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAttachmentFamilyResolver>(
      CommonCreateAttachmentFamilyResolver,
    );
    handler = module.get<CommonCreateAttachmentFamilyHandler>(
      CommonCreateAttachmentFamilyHandler,
    );
  });

  test('CommonCreateAttachmentFamilyResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAttachmentFamilyResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachmentFamily created', async () => {
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
          <CommonCreateAttachmentFamilyInput>commonMockAttachmentFamilyData[0],
        ),
      ).toBe(commonMockAttachmentFamilyData[0]);
    });
  });
});
