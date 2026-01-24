import {
  CommonCreateAttachmentsCommand,
  commonMockAttachmentData,
} from '@app/common/attachment';
import { CommonCreateAttachmentsCommandHandler } from '@app/common/attachment/application/create/common-create-attachments.command-handler';
import { CommonCreateAttachmentsService } from '@app/common/attachment/application/create/common-create-attachments.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateAttachmentsCommandHandler', () => {
  let commandHandler: CommonCreateAttachmentsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAttachmentsCommandHandler,
        {
          provide: CommonCreateAttachmentsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateAttachmentsCommandHandler>(
      CommonCreateAttachmentsCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockAttachmentData created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateAttachmentsCommand(commonMockAttachmentData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
