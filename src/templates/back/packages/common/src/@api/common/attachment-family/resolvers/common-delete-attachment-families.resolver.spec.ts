/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAttachmentFamiliesHandler,
  CommonDeleteAttachmentFamiliesResolver,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentFamiliesResolver', () => {
  let resolver: CommonDeleteAttachmentFamiliesResolver;
  let handler: CommonDeleteAttachmentFamiliesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAttachmentFamiliesResolver,
        {
          provide: CommonDeleteAttachmentFamiliesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAttachmentFamiliesResolver>(
      CommonDeleteAttachmentFamiliesResolver,
    );
    handler = module.get<CommonDeleteAttachmentFamiliesHandler>(
      CommonDeleteAttachmentFamiliesHandler,
    );
  });

  test('CommonDeleteAttachmentFamiliesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAttachmentFamiliesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an commonMockAttachmentFamilyData deleted', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () =>
            new Promise((resolve) => resolve(commonMockAttachmentFamilyData)),
        );
      expect(await resolver.main()).toBe(commonMockAttachmentFamilyData);
    });
  });
});
