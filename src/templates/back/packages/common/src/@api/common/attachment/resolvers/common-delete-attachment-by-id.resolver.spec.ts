/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CommonDeleteAttachmentByIdHandler,
  CommonDeleteAttachmentByIdResolver,
} from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentByIdResolver', () => {
  let resolver: CommonDeleteAttachmentByIdResolver;
  let handler: CommonDeleteAttachmentByIdHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonDeleteAttachmentByIdResolver,
        {
          provide: CommonDeleteAttachmentByIdHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonDeleteAttachmentByIdResolver>(
      CommonDeleteAttachmentByIdResolver,
    );
    handler = module.get<CommonDeleteAttachmentByIdHandler>(
      CommonDeleteAttachmentByIdHandler,
    );
  });

  test('CommonDeleteAttachmentByIdResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonDeleteAttachmentByIdResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });

    test('should return an attachment deleted', async () => {
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
