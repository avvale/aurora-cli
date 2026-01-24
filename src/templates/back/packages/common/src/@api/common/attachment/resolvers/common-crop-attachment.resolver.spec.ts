/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CommonCropAttachmentHandler } from '../handlers/common-crop-attachment.handler';
import { CommonCropAttachmentResolver } from './common-crop-attachment.resolver';

describe('CommonCropAttachmentResolver', () => {
  let resolver: CommonCropAttachmentResolver;
  let handler: CommonCropAttachmentHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        CommonCropAttachmentResolver,
        {
          provide: CommonCropAttachmentHandler,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    resolver = module.get<CommonCropAttachmentResolver>(
      CommonCropAttachmentResolver,
    );
    handler = module.get<CommonCropAttachmentHandler>(
      CommonCropAttachmentHandler,
    );
  });

  test('CommonCropAttachmentResolver should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('main', () => {
    test('CommonCropAttachmentResolver should be defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});
