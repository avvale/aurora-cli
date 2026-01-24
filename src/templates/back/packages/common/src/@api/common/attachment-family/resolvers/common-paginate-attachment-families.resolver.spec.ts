/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonPaginateAttachmentFamiliesHandler,
  CommonPaginateAttachmentFamiliesResolver,
} from '@api/common/attachment-family';
import { commonMockAttachmentFamilyData } from '@app/common/attachment-family';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonPaginateAttachmentFamiliesResolver', () => {
  let resolver: CommonPaginateAttachmentFamiliesResolver;
  let handler: CommonPaginateAttachmentFamiliesHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonPaginateAttachmentFamiliesResolver,
        {
          provide: CommonPaginateAttachmentFamiliesHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonPaginateAttachmentFamiliesResolver>(
      CommonPaginateAttachmentFamiliesResolver,
    );
    handler = module.get<CommonPaginateAttachmentFamiliesHandler>(
      CommonPaginateAttachmentFamiliesHandler,
    );
  });

  test('CommonPaginateAttachmentFamiliesResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonPaginateAttachmentFamiliesResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return a commonMockAttachmentFamilyData', async () => {
      jest.spyOn(handler, 'main').mockImplementation(
        () =>
          new Promise((resolve) =>
            resolve({
              total: 5,
              count: 5,
              rows: commonMockAttachmentFamilyData,
            }),
          ),
      );
      expect(await resolver.main()).toStrictEqual({
        total: 5,
        count: 5,
        rows: commonMockAttachmentFamilyData,
      });
    });
  });
});
