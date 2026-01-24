import {
  CommonCreateAttachmentsHandler,
  CommonCreateAttachmentsResolver,
} from '@api/common/attachment';
import { CommonCreateAttachmentInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentsResolver', () => {
  let resolver: CommonCreateAttachmentsResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAttachmentsResolver,
        {
          provide: CommonCreateAttachmentsHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCreateAttachmentsResolver>(
      CommonCreateAttachmentsResolver,
    );
  });

  test('CommonCreateAttachmentsResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCreateAttachmentsResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachments created', async () => {
      expect(
        await resolver.main(
          <CommonCreateAttachmentInput[]>commonMockAttachmentData,
        ),
      ).toBe(undefined);
    });
  });
});
