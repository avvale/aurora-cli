import { CommonCreateAttachmentsHandler } from '@api/common/attachment';
import { commonMockAttachmentData } from '@app/common/attachment';
import { ICommandBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAttachmentsHandler', () => {
  let handler: CommonCreateAttachmentsHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAttachmentsHandler,
        {
          provide: ICommandBus,
          useValue: {
            dispatch: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    handler = module.get<CommonCreateAttachmentsHandler>(
      CommonCreateAttachmentsHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentsHandler should be defined', () => {
      expect(handler).toBeDefined();
    });

    test('should return an commonMockAttachmentData created', async () => {
      expect(await handler.main(commonMockAttachmentData)).toBe(true);
    });
  });
});
