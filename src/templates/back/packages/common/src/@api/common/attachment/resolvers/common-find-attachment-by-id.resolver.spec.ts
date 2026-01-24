/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonFindAttachmentByIdHandler,
  CommonFindAttachmentByIdResolver,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonFindAttachmentByIdResolver', () => {
  let resolver: CommonFindAttachmentByIdResolver;
  let handler: CommonFindAttachmentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonFindAttachmentByIdResolver,
        {
          provide: CommonFindAttachmentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonFindAttachmentByIdResolver>(
      CommonFindAttachmentByIdResolver,
    );
    handler = module.get<CommonFindAttachmentByIdHandler>(
      CommonFindAttachmentByIdHandler,
    );
  });

  test('CommonFindAttachmentByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonFindAttachmentByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachment by id', async () => {
      jest
        .spyOn(handler, 'main')
        .mockImplementation(
          () => new Promise((resolve) => resolve(commonMockAttachmentData[0])),
        );
      expect(await resolver.main(commonMockAttachmentData[0].id)).toBe(
        commonMockAttachmentData[0],
      );
    });
  });
});
