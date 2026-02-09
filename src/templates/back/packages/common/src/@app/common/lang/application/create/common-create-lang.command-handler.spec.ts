/**
 * @aurora-generated
 * @source cliter/common/lang.aurora.yaml
 */
import { CommonCreateLangCommand, commonMockLangData } from '@app/common/lang';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonCreateLangCommandHandler } from './common-create-lang.command-handler';
import { CommonCreateLangService } from './common-create-lang.service';

describe('CommonCreateLangCommandHandler', () => {
  let commandHandler: CommonCreateLangCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateLangCommandHandler,
        {
          provide: CommonCreateLangService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateLangCommandHandler>(
      CommonCreateLangCommandHandler,
    );
  });

  describe('main', () => {
    test('CreateLangCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the values objects and pass them as parameters to the CommonCreateLangService', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateLangCommand(
            {
              id: commonMockLangData[0].id,
              rowId: commonMockLangData[0].rowId,
              name: commonMockLangData[0].name,
              image: commonMockLangData[0].image,
              iso6392: commonMockLangData[0].iso6392,
              iso6393: commonMockLangData[0].iso6393,
              ietf: commonMockLangData[0].ietf,
              customCode: commonMockLangData[0].customCode,
              dir: commonMockLangData[0].dir,
              sort: commonMockLangData[0].sort,
              isActive: commonMockLangData[0].isActive,
            },
            { timezone: process.env.TZ },
          ),
        ),
      ).toBe(undefined);
    });
  });
});
