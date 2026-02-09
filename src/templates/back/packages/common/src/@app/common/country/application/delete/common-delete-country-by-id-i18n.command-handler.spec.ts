/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import {
  CommonDeleteCountryByIdI18nCommand,
  commonMockCountryData,
} from '@app/common/country';
import { CommonDeleteCountryByIdI18nCommandHandler } from '@app/common/country/application/delete/common-delete-country-by-id-i18n.command-handler';
import { CommonDeleteCountryByIdI18nService } from '@app/common/country/application/delete/common-delete-country-by-id-i18n.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonDeleteCountryByIdI18nCommandHandler', () => {
  let commandHandler: CommonDeleteCountryByIdI18nCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonDeleteCountryByIdI18nCommandHandler,
        {
          provide: CommonDeleteCountryByIdI18nService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonDeleteCountryByIdI18nCommandHandler>(
      CommonDeleteCountryByIdI18nCommandHandler,
    );
  });

  describe('main', () => {
    test('DeleteCountryByIdI18nCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should create the value object id and pass them as parameters to the DeleteCountryByIdI18nService', async () => {
      expect(
        await commandHandler.execute(
          new CommonDeleteCountryByIdI18nCommand(commonMockCountryData[0].id),
        ),
      ).toBe(undefined);
    });
  });
});
