import { CommonCreateLangsCommand, commonMockLangData } from '@app/common/lang';
import { CommonCreateLangsCommandHandler } from '@app/common/lang/application/create/common-create-langs.command-handler';
import { CommonCreateLangsService } from '@app/common/lang/application/create/common-create-langs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateLangsCommandHandler', () => {
  let commandHandler: CommonCreateLangsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateLangsCommandHandler,
        {
          provide: CommonCreateLangsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateLangsCommandHandler>(
      CommonCreateLangsCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateLangsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockLangData created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateLangsCommand(commonMockLangData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
