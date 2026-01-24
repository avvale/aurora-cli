import { CommonDeleteLangsCommand } from '@app/common/lang';
import { CommonDeleteLangsCommandHandler } from '@app/common/lang/application/delete/common-delete-langs.command-handler';
import { CommonDeleteLangsService } from '@app/common/lang/application/delete/common-delete-langs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteLangsCommandHandler', () => {
  let commandHandler: CommonDeleteLangsCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteLangsCommandHandler,
        {
          provide: CommonDeleteLangsService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonDeleteLangsCommandHandler>(
      CommonDeleteLangsCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonDeleteLangsCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return void', async () => {
      expect(await commandHandler.execute(new CommonDeleteLangsCommand())).toBe(
        undefined,
      );
    });
  });
});
