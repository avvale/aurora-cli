import {
  commonMockAttachmentFamilyData,
  CommonUpdateAttachmentFamilyByIdCommand,
} from '@app/common/attachment-family';
import { CommonUpdateAttachmentFamilyByIdCommandHandler } from '@app/common/attachment-family/application/update/common-update-attachment-family-by-id.command-handler';
import { CommonUpdateAttachmentFamilyByIdService } from '@app/common/attachment-family/application/update/common-update-attachment-family-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAttachmentFamilyByIdCommandHandler', () => {
  let commandHandler: CommonUpdateAttachmentFamilyByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonUpdateAttachmentFamilyByIdCommandHandler,
        {
          provide: CommonUpdateAttachmentFamilyByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonUpdateAttachmentFamilyByIdCommandHandler>(
      CommonUpdateAttachmentFamilyByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('UpdateAttachmentFamilyByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return an attachmentFamily created', async () => {
      expect(
        await commandHandler.execute(
          new CommonUpdateAttachmentFamilyByIdCommand(
            {
              id: commonMockAttachmentFamilyData[0].id,
              resourceId: commonMockAttachmentFamilyData[0].resourceId,
              code: commonMockAttachmentFamilyData[0].code,
              name: commonMockAttachmentFamilyData[0].name,
              width: commonMockAttachmentFamilyData[0].width,
              height: commonMockAttachmentFamilyData[0].height,
              fitType: commonMockAttachmentFamilyData[0].fitType,
              quality: commonMockAttachmentFamilyData[0].quality,
              sizes: commonMockAttachmentFamilyData[0].sizes,
              format: commonMockAttachmentFamilyData[0].format,
            },
            {},
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
