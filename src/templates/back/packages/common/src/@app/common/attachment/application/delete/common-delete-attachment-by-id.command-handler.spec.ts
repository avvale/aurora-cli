import {
  CommonDeleteAttachmentByIdCommand,
  commonMockAttachmentData,
} from '@app/common/attachment';
import { CommonDeleteAttachmentByIdCommandHandler } from '@app/common/attachment/application/delete/common-delete-attachment-by-id.command-handler';
import { CommonDeleteAttachmentByIdService } from '@app/common/attachment/application/delete/common-delete-attachment-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteAttachmentByIdCommandHandler', () => {
  let commandHandler: CommonDeleteAttachmentByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteAttachmentByIdCommandHandler,
        {
          provide: CommonDeleteAttachmentByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonDeleteAttachmentByIdCommandHandler>(
      CommonDeleteAttachmentByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteAttachmentByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the CommonDeleteAttachmentByIdService', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteAttachmentByIdCommand(commonMockAttachmentData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
