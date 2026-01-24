/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAttachmentFamilyByIdHandler,
  CommonDeleteAttachmentFamilyByIdResolver,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamilyByIdResolver', () => {
  let resolver: CommonDeleteAttachmentFamilyByIdResolver;
  let handler: CommonDeleteAttachmentFamilyByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAttachmentFamilyByIdResolver,
        {
          provide: CommonDeleteAttachmentFamilyByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAttachmentFamilyByIdResolver>(
      CommonDeleteAttachmentFamilyByIdResolver,
    );
    handler = module.get<CommonDeleteAttachmentFamilyByIdHandler>(
      CommonDeleteAttachmentFamilyByIdHandler,
    );
  });

  test('CommonDeleteAttachmentFamilyByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAttachmentFamilyByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachmentFamily deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) =>
              resolve(commonMockAttachmentFamilyData[0]),
            ),
        );
      expect(await resolver.main(commonMockAttachmentFamilyData[0].id)).toBe(
        commonMockAttachmentFamilyData[0],
      );
    });
  });
});
