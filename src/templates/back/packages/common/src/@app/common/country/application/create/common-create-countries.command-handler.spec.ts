import {
  CommonCreateCountriesCommand,
  commonMockCountryData,
} from '@app/common/country';
import { CommonCreateCountriesCommandHandler } from '@app/common/country/application/create/common-create-countries.command-handler';
import { CommonCreateCountriesService } from '@app/common/country/application/create/common-create-countries.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('commonCreateCountriesCommandHandler', () => {
  let commandHandler: CommonCreateCountriesCommandHandler;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonCreateCountriesCommandHandler,
        {
          provide: CommonCreateCountriesService,
          useValue: {
            main: () => {
              /**/
            },
          },
        },
      ],
    }).compile();

    commandHandler = module.get<CommonCreateCountriesCommandHandler>(
      CommonCreateCountriesCommandHandler,
    );
  });

  describe('main', () => {
    test('CommonCreateCountriesCommandHandler should be defined', () => {
      expect(commandHandler).toBeDefined();
    });

    test('should return CommonMockCountryData created', async () => {
      expect(
        await commandHandler.execute(
          new CommonCreateCountriesCommand(commonMockCountryData, {
            timezone: process.env.TZ,
          }),
        ),
      ).toBe(undefined);
    });
  });
});
