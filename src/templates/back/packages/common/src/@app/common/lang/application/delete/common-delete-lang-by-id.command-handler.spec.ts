import {
  CommonDeleteLangByIdCommand,
  commonMockLangData,
} from '@app/common/lang';
import { CommonDeleteLangByIdCommandHandler } from '@app/common/lang/application/delete/common-delete-lang-by-id.command-handler';
import { CommonDeleteLangByIdService } from '@app/common/lang/application/delete/common-delete-lang-by-id.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangByIdCommandHandler', () => {
  let commandHandler: CommonDeleteLangByIdCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteLangByIdCommandHandler,
        {
          provide: CommonDeleteLangByIdService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonDeleteLangByIdCommandHandler>(
      CommonDeleteLangByIdCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteLangByIdCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the CommonDeleteLangByIdService', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteLangByIdCommand(commonMockLangData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
