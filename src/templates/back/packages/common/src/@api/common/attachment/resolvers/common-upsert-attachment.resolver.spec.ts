/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonUpsertAttachmentHandler,
  CommonUpsertAttachmentResolver,
} from '@api/common/attachment';
import { CommonUpdateAttachmentByIdInput } from '@api/graphql';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAttachmentResolver', () => {
  let resolver: CommonUpsertAttachmentResolver;
  let handler: CommonUpsertAttachmentHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonUpsertAttachmentResolver,
        {
          provide: CommonUpsertAttachmentHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonUpsertAttachmentResolver>(
      CommonUpsertAttachmentResolver,
    );
    handler = module.get<CommonUpsertAttachmentHandler>(
      CommonUpsertAttachmentHandler,
    );
  });

  test('CommonUpsertAttachmentResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonUpsertAttachmentResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachment upserted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData[0])),
        );
      expect(
        await resolver.main(
          <CommonUpdateAttachmentByIdInput>commonMockAttachmentData[0],
        ),
      ).toBe(commonMockAttachmentData[0]);
    });
  });
});
