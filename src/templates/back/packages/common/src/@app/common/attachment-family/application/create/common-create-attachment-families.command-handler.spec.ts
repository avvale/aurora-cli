import {
  CommonCreateAttachmentFamiliesCommand,
  commonMockAttachmentFamilyData,
} from '@app/common/attachment-family';
import { CommonCreateAttachmentFamiliesCommandHandler } from '@app/common/attachment-family/application/create/common-create-attachment-families.command-handler';
import { CommonCreateAttachmentFamiliesService } from '@app/common/attachment-family/application/create/common-create-attachment-families.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateAttachmentFamiliesCommandHandler', () => {
  let commandHandler: CommonCreateAttachmentFamiliesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateAttachmentFamiliesCommandHandler,
        {
          provide: CommonCreateAttachmentFamiliesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateAttachmentFamiliesCommandHandler>(
      CommonCreateAttachmentFamiliesCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateAttachmentFamiliesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockAttachmentFamilyData created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateAttachmentFamiliesCommand(
            commonMockAttachmentFamilyData,
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
